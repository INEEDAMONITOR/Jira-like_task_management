import { Dispatch, useCallback, useReducer, useState } from 'react';
import { useMountRef } from 'utils';

enum Type {
	SetData,
	SetError,
	Loading,
	Idle,
}

enum Stat {
	IDLE = 'idle',
	LOADING = 'loading',
	ERROR = 'error',
	SUCCESS = 'success',
}

interface State<D> {
	error: Error | null;
	data: D | null;
	stat: Stat;
}

type Action<D> =
	| { error: Error; type: Type.SetError }
	| { data: D | null; type: Type.SetData }
	| { type: Type.Loading }
	| { type: Type.Idle };

const createStateReducer = <D>() => (
	state: State<D>,
	action: Action<D>
): State<D> => {
	const { type } = action;
	switch (type) {
		case Type.SetData: {
			return {
				data: action.data,
				stat: Stat.SUCCESS,
				error: null,
			} as State<D>;
		}
		case Type.SetError: {
			return {
				data: null,
				stat: Stat.ERROR,
				error: action.error,
			} as State<D>;
		}
		case Type.Loading: {
			return {
				...state,
				stat: Stat.LOADING,
			} as State<D>;
		}
		case Type.Idle: {
			return {
				data: null,
				stat: Stat.IDLE,
				error: null,
			} as State<D>;
		}
	}
};
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
	const mountedRef = useMountRef();
	return useCallback(
		(...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
		[dispatch, mountedRef]
	);
};
const defaultConfig = {
	throwOnError: false,
};
const defaultInitialState: State<null> = {
	stat: Stat.IDLE,
	data: null,
	error: null,
};
export const useAsync = <D>(
	initialState?: State<D>,
	initConfig?: typeof defaultConfig
) => {
	const [retry, setRetry] = useState<() => {}>(() => () => {});
	const config = { ...defaultConfig, ...initConfig };

	const [state, dispatch] = useReducer(createStateReducer<D>(), {
		...defaultInitialState,
		...initialState,
	} as State<D>);

	const safeDispatch = useSafeDispatch(dispatch);

	const setData = useCallback(
		(data: D) => {
			safeDispatch({ data: data, type: Type.SetData });
		},
		[safeDispatch]
	);

	const setError = useCallback(
		(error: Error) => {
			safeDispatch({ error: error, type: Type.SetError });
		},
		[safeDispatch]
	);

	// run trigger async request

	const run = useCallback(
		(promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
			if (!promise?.then) {
				throw new Error(
					`Argument of type '${typeof promise}' is not assignable to parameter of type 'Promise<D>'`
				);
			}
			setRetry(() => () => {
				if (runConfig?.retry) {
					run(runConfig.retry(), runConfig);
				}
			});
			safeDispatch({ type: Type.Loading });
			return promise
				.then((data) => {
					setData(data);
					return data;
				})
				.catch((error) => {
					setError(error);
					if (config.throwOnError) {
						return Promise.reject(error);
					}
					return error;
				});
		},
		[config.throwOnError, safeDispatch, setData, setError]
	);
	return {
		isIdle: state.stat === Stat.IDLE,
		isLoading: state.stat === Stat.LOADING,
		isError: state.stat === Stat.ERROR,
		isSuccess: state.stat === Stat.SUCCESS,
		run,
		retry,
		setData,
		setError,
		...state,
	};
};
