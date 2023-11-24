import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useProject } from 'utils/projects';
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
	return useMemo(
		() => ({
			projectId,
			typeId: Number(param.typeId) || undefined,
			processorId: Number(param.processorId) || undefined,
			tagId: Number(param.tagId) || undefined,
			name: param.name || undefined,
		}),
		[projectId, param]
	);
};

export const useTaskQueryKey = () => ['tasks', useTaskSearchParam()];
