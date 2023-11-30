import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useDebounce } from 'utils';
import { useProject } from 'utils/projects';
import { useTask } from 'utils/tasks';
import { useUrlQueryParam } from 'utils/url';

export const useProjectIdInUrl = () => {
	const { pathname } = useLocation();
	const id = pathname.match(/(?<=projects\/)\d+/)?.[0];
	return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParam = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParam()];

export const useTaskSearchParam = () => {
	const [param, setParam] = useUrlQueryParam([
		'name',
		'typeId',
		'processorId',
		'tagId',
	]);
	const projectId = useProjectIdInUrl();
	const debouncedName = useDebounce(param.name, 200);
	return useMemo(
		() => ({
			projectId,
			typeId: Number(param.typeId) || undefined,
			processorId: Number(param.processorId) || undefined,
			tagId: Number(param.tagId) || undefined,
			name: debouncedName || undefined,
		}),
		[projectId, param.typeId, param.processorId, param.tagId, debouncedName]
	);
};

export const useTaskQueryKey = () => ['tasks', useTaskSearchParam()];

export const useTaskModal = () => {
	const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
		'editingTaskId',
	]);
	const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
	const startEdit = useCallback(
		(id: number) => {
			setEditingTaskId({ editingTaskId: id });
		},
		[setEditingTaskId]
	);

	const close = useCallback(() => {
		setEditingTaskId({
			editingTaskId: undefined,
		});
	}, [setEditingTaskId]);

	return {
		isOpen: !!editingTaskId,
		close,
		startEdit,
		editingTask,
		editingTaskId,
		isLoading,
	};
};
