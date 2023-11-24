import { useQuery } from 'react-query';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { Task } from 'types/task';
import { TaskType } from 'types/task-type';

export const useTaskTypes = (param?: Partial<Task>) => {
	const client = useHttp();
	// keys: ['project', param] like in the useEffect

	return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'));
};
