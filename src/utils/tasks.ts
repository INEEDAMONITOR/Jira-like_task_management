import { useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Task } from 'types/task';

export const useTasks = (param?: Partial<Task>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<Task[]>(['tasks', cleanObject(param)], () =>
		client('tasks', { data: param })
	);
};
