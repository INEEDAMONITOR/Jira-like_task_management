import { useMemo } from 'react';
import { shallowEqualObjects } from 'react-query/types/core/utils';
import useUrlQueryParam from 'utils/url';

/**
 * Manage the search parameters in the project search screen
 *
 *
 * @returns
 * - `params`: the search params
 * - `setParams`: function used to change the search params
 */
export const useProjectSearchParams = () => {
	const [urlParams, setUrlParams] = useUrlQueryParam(['name', 'personId']);
	const param = useMemo(
		() => ({
			...urlParams,
			personId: Number(urlParams.personId) || undefined,
		}),
		[urlParams]
	);
	return [param, setUrlParams] as const;
};

export const useProjectModal = () => {
	const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
		'projectCreate',
		'projectId',
	]);

	const open = (projectId: number | undefined = undefined) => {
		setProjectCreate({
			projectCreate: true,
			projectId: projectId,
		});
	};
	const close = () =>
		setProjectCreate({ projectCreate: undefined, projectId: undefined });
	return { isOpen: projectCreate === 'true', open, close } as const;
};
