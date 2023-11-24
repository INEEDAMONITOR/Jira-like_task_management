import { useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Kanban } from 'types/kanban';

export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<Kanban[]>(['kanbans', cleanObject(param)], () =>
		client('kanbans', { data: param })
	);
};
