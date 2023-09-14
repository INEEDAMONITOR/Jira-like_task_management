import React, { useEffect, useState } from 'react';
import * as qs from 'qs';
import SearchPanel from './search-panel';
import List from './list';
import { cleanObject, useDebounce, useMount } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

function ProjectListScreen() {
	const [list, setList] = useState([]);
	const [users, setUsers] = useState([]);
	const [param, setParam] = useState({
		name: '',
		personId: '',
	});
	const debouncedParam = useDebounce(param, 500);
	useMount(() => {
		fetch(`${apiUrl}/users`).then(async (response) => {
			if (response.ok) {
				setUsers(await response.json());
			}
		});
	});

	useEffect(() => {
		fetch(
			`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`,
		).then(async (response) => {
			if (response.ok) {
				setList(await response.json());
			}
		});
	}, [debouncedParam]);
	return (
		<>
			<SearchPanel param={param} setParam={setParam} users={users} />
			<List list={list} users={users} />
		</>
	);
}

export default ProjectListScreen;
