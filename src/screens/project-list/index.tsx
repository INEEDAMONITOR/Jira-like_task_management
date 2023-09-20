import React from 'react';
import { SearchPanel } from 'screens/project-list/search-panel';
import { List } from 'screens/project-list/list';
import { useState } from 'react';
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/projects';
import useUser from 'utils/user';

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: '',
	});
	const debouncedParam = useDebounce(param, 200);
	const { isLoading, error, data: list } = useProjects(debouncedParam);
	const { data: users } = useUser();
	useDocumentTitle('Project list', false);
	return (
		<Container>
			<h1>Project list</h1>

			<SearchPanel
				users={users || []}
				param={param}
				setParam={setParam}
			/>

			{error ? (
				<Typography.Text type={'danger'}>
					{error.message}
				</Typography.Text>
			) : null}

			<List
				users={users || []}
				dataSource={list || []}
				loading={isLoading}
			/>
		</Container>
	);
};

const Container = styled.div`
	padding: 3.2rem;
`;
