import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
	value === '' || value === null || value === undefined ? true : false;

export const cleanObject = (object: { [key: string]: unknown }) => {
	const result = { ...object };
	Object.keys(result).forEach((key) => {
		const value = result[key];
		if (isVoid(value)) {
			delete result[key];
		}
	});
	return result;
};

export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback();
		// TODO 依赖项里加上callback会造成无限循环，这个和 useCallback 以及 useMemo 有关系

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
	const [value, setValue] = useState(initialArray);
	return {
		value,
		setValue,
		add: (item: T) => setValue([...value, item]),
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const copy = [...value];
			copy.splice(index, 1);
			setValue(copy);
		},
	};
};

export const useDocumentTitle = (
	title: string,
	keepOnUnmount: boolean = true
) => {
	const oldTitle = document.title;
	useEffect(() => {
		document.title = title;
	}, [title]);
	useEffect(() => {
		return () => {
			if (!keepOnUnmount) {
				document.title = oldTitle;
			}
		};
	}, []);
};
