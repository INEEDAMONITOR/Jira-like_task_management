import { Project } from 'screens/project-list/list';
import { useHttp } from './http';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
import {
	useProjectQueryKey,
	useProjectSearchParams,
} from 'screens/project-list/util';
import {
	useAddConfig,
	useDeleteConfig,
	useEditConfig,
} from './use-optimistic-option';
import { cleanObject } from 'utils';

/**
 * Project list State manager
 * @param param
 * @returns
 */
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<Project[]>(['projects', cleanObject(param)], () =>
		client('projects', { data: param })
	);
};

/**
 * Single Project State manager
 * @param id
 * @returns useQuery
 */
export const useProject = (id?: number) => {
	const client = useHttp();
	return useQuery<Project>(['project', id], () => client(`projects/${id}`), {
		enabled: !!id, // boolean id
	});
};

export const useEditProject = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects/${params.id}`, {
				method: 'PATCH',
				data: params,
			}),
		useEditConfig(queryKey, ['projects'])
	);
};

export const useAddProject = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects`, {
				method: 'POST',
				data: params,
			}),
		useAddConfig(queryKey, ['projects'])
	);
};

export const useDeleteProject = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(id: number) =>
			client(`projects/${id}`, {
				method: 'DELETE',
			}),
		useDeleteConfig(queryKey, ['projects'])
	);
};
