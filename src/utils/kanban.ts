import { QueryKey, useMutation, useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Kanban } from 'types/kanban';
import {
	useAddConfig,
	useDeleteConfig,
	useReorderKanbanConfig,
	useReorderTaskConfig,
} from './use-optimistic-option';
import { isQueryKey } from 'react-query/types/core/utils';

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

/**
 * @param fromId - reordered item's id
 * @param referenceId - target item's id
 * @param type - place reordered item 'before' or 'after' the target item
 */
export interface SortProps {
	fromId: number;
	referenceId: number;
	type: 'before' | 'after';
	fromKanbanId?: number;
	toKanbanId?: number;
}
export const useReorderKanban = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation((params: SortProps) => {
		return client('kanbans/reorder', {
			data: params,
			method: 'POST',
		});
	}, useReorderKanbanConfig(queryKey));
};

export const useReorderTask = (queryKey: QueryKey) => {
	const client = useHttp();
	return useMutation((params: SortProps) => {
		return client('tasks/reorder', {
			data: params,
			method: 'POST',
		});
	}, useReorderTaskConfig(queryKey));
};
