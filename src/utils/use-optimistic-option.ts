import { QueryKey, useQueryClient } from 'react-query';

export const useConfig = (
	queryKey: QueryKey,
	callback: (target: any, old?: any[]) => any[],
	optionalOnSuccessQueryKey?: QueryKey
) => {
	const queryClient = useQueryClient();
	return {
		onSuccess: () => {
			queryClient.invalidateQueries(queryKey);
			if (optionalOnSuccessQueryKey) {
				queryClient.invalidateQueries(optionalOnSuccessQueryKey);
			}
		},
		async onMutate(target: any) {
			const previousItems = queryClient.getQueryData(queryKey);
			queryClient.setQueryData(queryKey, (old?: any[]) => {
				return callback(target, old);
			});
			return { previousItems };
		},
		onError(error: any, newItem: any, context: any) {
			queryClient.setQueryData(queryKey, context?.previousItems);
		},
	};
};

export const useDeleteConfig = (
	queryKey: QueryKey,
	optionalOnSuccessQueryKey?: QueryKey
) =>
	useConfig(
		queryKey,
		(target, old) => old?.filter((item) => item.id !== target.id) || [],
		optionalOnSuccessQueryKey
	);
export const useEditConfig = (
	queryKey: QueryKey,
	optionalOnSuccessQueryKey?: QueryKey
) =>
	useConfig(
		queryKey,
		(target, old) => {
			return (
				old?.map((item) =>
					item.id === target.id ? { ...item, ...target } : item
				) || []
			);
		},
		optionalOnSuccessQueryKey
	);
export const useAddConfig = (
	queryKey: QueryKey,
	optionalOnSuccessQueryKey?: QueryKey
) =>
	useConfig(
		queryKey,
		(target, old) => (old ? [...old, target] : []),
		optionalOnSuccessQueryKey
	);
