import { EDEADLK } from 'constants';
import { useMemo } from 'react';
import { shallowEqualObjects } from 'react-query/types/core/utils';
import { useProject } from 'utils/projects';
import useUrlQueryParam from 'utils/url';

/**
 * Manage the search parameters in the project search screen
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
	const [
		{ projectCreate, editingProjectId },
		setUrlParams,
	] = useUrlQueryParam(['projectCreate', 'editingProjectId']);

	const { data: editingProject, isLoading } = useProject(
		Number(editingProjectId)
	);
	const startEdit = (projectId: number) =>
		setUrlParams({
			editingProjectId: projectId,
		});

	const open = () => {
		setUrlParams({
			projectCreate: true,
		});
	};
	const close = () => {
		setUrlParams({
			projectCreate: undefined,
			editingProjectId: undefined,
		});
	};
	return {
		isOpen: projectCreate === 'true' || !!editingProjectId,
		open,
		close,
		startEdit,
		editingProject,
		isLoading,
	} as const;
};
