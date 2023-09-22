import { Project } from 'screens/project-list/list';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from './http';

export const useProjects = (param?: Partial<Project>) => {
	const { run, ...result } = useAsync<Project[]>();
	const client = useHttp();

	const fetchProjects = () =>
		client('projects', { data: cleanObject(param || {}) });

	useEffect(() => {
		run(fetchProjects(), { retry: fetchProjects });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);
	return result;
};

export const useEditProjects = () => {
	const { run, ...asyncResult } = useAsync<Project[]>();
	const client = useHttp();
	const mutate = (params: Pick<Project, 'id'> & Partial<Project>) => {
		return run(
			client(`projects/${params.id}`, {
				method: 'PATCH',
				data: params,
			})
		);
	};
	return {
		mutate,
		asyncResult,
	};
};

export const useAddProjects = () => {
	const { run, ...asyncResult } = useAsync<Project[]>();
	useEffect(() => {});
	const client = useHttp();
	const mutate = (params: Pick<Project, 'id'> & Partial<Project>) => {
		return run(
			client(`projects/${params.id}`, {
				method: 'POST',
				data: params,
			})
		);
	};
	return {
		mutate,
		asyncResult,
	};
};
