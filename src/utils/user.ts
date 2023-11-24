import { User } from 'types/User';
import { useHttp } from './http';
import { useAsync } from './use-async';
import { useEffect } from 'react';
import { cleanObject } from 'utils';

function useUser(param?: Partial<User>) {
	const client = useHttp();
	const { run, ...result } = useAsync<User[]>();
	useEffect(() => {
		run(client('users', { data: cleanObject(param || {}) }));
	}, [param, run, client]);
	return result;
}

export default useUser;
