import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject, subset } from 'utils';

/**
 *
 * @param {string[]} keys - keys you want to check in the url query
 *
 * @return
 * - `params` the params in the url
 * - `setParams` function to change the query url by give param
 *
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
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[searchParams]
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
