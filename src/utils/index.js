import { useEffect, useState } from 'react';
// !!value:                                     undefined   1
//      !value =>  (non-boolean to boolean)     true        false
//      ！！value => not not -> original        false      true
export const isTrue = (value) => (value === 0 ? true : !!value);
export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
	const result = {
		...object,
	};
	Object.keys(object).forEach((key) => {
		const value = object[key];
		if (isFalsy(value)) {
			delete result[key];
		}
	});
	return result;
};

export const useMount = (callback) => {
	useEffect(() => {
		callback();
	}, []);
};

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		let timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(timer);
	}, [value, delay]);
	return debouncedValue;
};
