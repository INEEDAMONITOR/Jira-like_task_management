import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Task } from 'types/task';
import {
	useAddConfig,
	useDeleteConfig,
	useEditConfig,
} from './use-optimistic-option';
import { isQueryKey } from 'react-query/types/core/utils';

export const useTasks = (param?: Partial<Task>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<Task[]>(['tasks', cleanObject(param)], () =>
		client('tasks', { data: param })
	);
};

export const useTask = (id?: number) => {
	const client = useHttp();
	return useQuery<Task>(['task', id], () => client(`tasks/${id}`), {
		enabled: !!id, // boolean id
	});
};

export const useAddTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Task>) =>
			client(`tasks`, {
				method: 'POST',
				data: params,
			}),
		useAddConfig(queryKey, ['tasks'])
	);
};

export const useEditTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Task>) =>
			client(`tasks/${params.id}`, {
				method: 'PATCH',
				data: params,
			}),
		useEditConfig(queryKey)
	);
};

export const useDeleteTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		({ id }: { id: number }) =>
			client(`tasks/${id}`, {
				method: 'DELETE',
			}),
		useDeleteConfig(queryKey, ['projects'])
	);
};
