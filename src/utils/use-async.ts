import { useState } from 'react';

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
	const config = { ...defaultConfig, ...initConfig };
	const [state, setState] = useState<State<D>>({
		...defaultInitialState,
		...initialState,
	});

	const setData = (data: D) =>
		setState({
			data,
			stat: 'success',
			error: null,
		});

	const setError = (error: Error) =>
		setState({
			error,
			stat: 'error',
			data: null,
		});

	// run trigger async request
	const run = (promise: Promise<D>) => {
		if (!promise || !promise.then) {
			throw new Error(
				`Argument of type '${typeof promise}' is not assignable to parameter of type 'Promise<D>'`
			);
		}
		setState({ ...state, stat: 'loading' });
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
	};

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		setData,
		setError,
		...state,
	};
};
