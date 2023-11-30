import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Kanban } from 'types/kanban';
import { useAddConfig, useDeleteConfig } from './use-optimistic-option';

export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<Kanban[]>(['kanbans', cleanObject(param)], () =>
		client('kanbans', { data: param })
	);
};

export const useDeleteKanban = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		({ id }: { id: number }) =>
			client(`kanbans/${id}`, {
				method: 'DELETE',
			}),
		useDeleteConfig(queryKey)
	);
};

export const useAddKanban = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation(
		(params: Partial<Kanban>) =>
			client(`kanbans`, {
				method: 'POST',
				data: params,
			}),
		useAddConfig(queryKey, ['kanbans'])
	);
};
