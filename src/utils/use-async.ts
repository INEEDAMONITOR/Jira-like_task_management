import { useCallback, useState } from 'react';
import { useMountRef } from 'utils';

interface State<D> {
	error: Error | null;
	data: D | null;
	stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
	stat: 'idle',
	data: null,
	error: null,
};
const defaultConfig = {
	throwOnError: false,
};
export const useAsync = <D>(
	initialState?: State<D>,
	initConfig?: typeof defaultConfig
) => {
	const [retry, setRetry] = useState<() => {}>(() => () => {});
	const config = { ...defaultConfig, ...initConfig };
	const [state, setState] = useState<State<D>>({
		...defaultInitialState,
		...initialState,
	});
	const mountedRef = useMountRef();

	const setData = useCallback(
		(data: D) =>
			setState({
				data,
				stat: 'success',
				error: null,
			}),
		[]
	);

	const setError = useCallback(
		(error: Error) =>
			setState({
				error,
				stat: 'error',
				data: null,
			}),
		[]
	);

	// run trigger async request

	const run = useCallback(
		(promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
			if (!promise || !promise.then) {
				throw new Error(
					`Argument of type '${typeof promise}' is not assignable to parameter of type 'Promise<D>'`
				);
			}
			setRetry(() => () => {
				if (runConfig?.retry) {
					run(runConfig.retry(), runConfig);
				}
			});
			setState((prev) => {
				return { ...prev, stat: 'loading' };
			});
			return promise
				.then((data) => {
					if (mountedRef.current) {
						setData(data);
					}
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
		[config.throwOnError, mountedRef, setData, setError]
	);
	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		retry,
		setData,
		setError,
		...state,
	};
};
