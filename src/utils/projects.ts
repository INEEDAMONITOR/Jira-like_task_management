import { Project } from 'screens/project-list/list';
import { useHttp } from './http';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useProjectSearchParams } from 'screens/project-list/util';

/**
 * Project list State manager
 * @param param
 * @returns
 */
export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect
	return useQuery<Project[]>(['projects', param], () =>
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

export const useEditProject = () => {
	const client = useHttp();
	const queryClient = useQueryClient();
	const [searchParams] = useProjectSearchParams();
	const queryKey = ['projects', searchParams];

	return useMutation(
		(params: Partial<Project>) =>
			client(`projects/${params.id}`, {
				method: 'PATCH',
				data: params,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries(queryKey),
			async onMutate(target) {
				const previousItems = queryClient.getQueryData(queryKey);
				queryClient.setQueryData(queryKey, (old?: Project[]) => {
					return (
						old?.map((project) => {
							if (project.id === target.id) {
								return {
									...project,
									...target,
								};
							}
							return project;
						}) || []
					);
				});
				return { previousItems };
			},
			onError(error, newItem, context) {
				queryClient.setQueryData(queryKey, context?.previousItems);
			},
		}
	);
};

export const useAddProject = () => {
	const client = useHttp();
	const queryClient = useQueryClient();
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects`, {
				method: 'POST',
				data: params,
			}),
		{
			onSuccess: () => queryClient.invalidateQueries('projects'),
		}
	);
};
