import { Project } from 'screens/project-list/list';
import { useAsync } from './use-async';
import { useCallback, useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from './http';

export const useProjects = (param?: Partial<Project>) => {
	const { run, ...result } = useAsync<Project[]>();
	const client = useHttp();

	const fetchProjects = useCallback(
		() => client('projects', { data: cleanObject(param || {}) }),
		[client, param]
	);

	useEffect(() => {
		run(fetchProjects(), { retry: fetchProjects });
	}, [fetchProjects, run]);
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
