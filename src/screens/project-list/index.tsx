import React from 'react';
import { SearchPanel } from 'screens/project-list/search-panel';
import { List } from 'screens/project-list/list';
import { useState } from 'react';
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled';
import { Button, InputNumber, Select, Typography } from 'antd';
import { useProjects } from 'utils/projects';
import useUser from 'utils/user';
import useUrlQueryParam from 'utils/url';

export const ProjectListScreen = () => {
	const [keys, setKeys] = useState<('name' | 'personId')[]>([
		'name',
		'personId',
	]);
	const [urlParam, setUrlParam] = useUrlQueryParam(keys);
	const debouncedParam = useDebounce(urlParam, 200);
	const { isLoading, error, data: list } = useProjects(debouncedParam);
	const { data: users } = useUser();
	useDocumentTitle('Project list', false);
	return (
		<Container>
			<h1>Project list</h1>
			<SearchPanel
				users={users || []}
				param={urlParam}
				setParam={setUrlParam}
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

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
	padding: 3.2rem;
`;
