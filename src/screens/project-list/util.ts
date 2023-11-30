import { useCallback, useMemo } from 'react';
import { cleanObject } from 'utils';
import { useProject } from 'utils/projects';
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url';

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

export const useProjectQueryKey = () => {
	const [params] = useProjectSearchParams();

	return ['projects', cleanObject(params)];
};

export const useProjectModal = () => {
	// const [
	// 	{ projectCreate, editingProjectId },
	// 	setUrlParams,
	// ] = useUrlQueryParam(['projectCreate', 'editingProjectId']);
	const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
		'projectCreate',
	]);
	const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
		'editingProjectId',
	]);
	const setUrlParams = useSetUrlSearchParam();
	const { data: editingProject, isLoading } = useProject(
		Number(editingProjectId)
	);
	const startEdit = useCallback(
		(projectId: number) =>
			setEditingProjectId({
				editingProjectId: projectId,
			}),
		[setEditingProjectId]
	);

	const open = useCallback(() => {
		setProjectCreate({
			projectCreate: true,
		});
	}, [setProjectCreate]);

	const close = useCallback(() => {
		setUrlParams({
			projectCreate: undefined,
			editingProjectId: undefined,
		});
	}, [setUrlParams]);

	return {
		isOpen: projectCreate === 'true' || !!editingProjectId,
		open,
		close,
		startEdit,
		editingProject,
		isLoading,
	} as const;
};
