import { useMemo } from 'react';
import { QueryObserver } from 'react-query';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from 'utils';

/**
 *
 * get the params in the url
 *
 * @param {string[]} keys - keys in the url
 * @return {*}
 */
const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [searchParams, setSearchParam] = useSearchParams();
	// Dependencies:
	// 	primitive type 		✅
	// 	state				✅
	// 	un-state object		❌ NEVER!
	return [
		useMemo(
			() =>
				keys.reduce((prev, key) => {
					return { ...prev, [key]: searchParams.get(key) || '' };
				}, {} as { [key in K]: string }),
			[searchParams, keys]
		),
		(param: Partial<{ [key in K]: unknown }>) => {
			const obj = cleanObject({
				...Object.fromEntries(searchParams),
				...param,
			}) as URLSearchParamsInit;
			return setSearchParam(obj);
		},
	] as const;
};
export default useUrlQueryParam;
