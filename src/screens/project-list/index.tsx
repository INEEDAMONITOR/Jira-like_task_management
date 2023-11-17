import React from 'react';
import { SearchPanel } from 'screens/project-list/search-panel';
import { List } from 'screens/project-list/list';
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled';
import { Button, Typography, Row } from 'antd';
import { useProjects } from 'utils/projects';
import useUser from 'utils/user';
import { useProjectSearchParams } from './util';

export const ProjectListScreen = (props: {
	setProjectModalOpen: (isOpen: boolean) => void;
}) => {
	useDocumentTitle('Project list', false);
	const [params, setParams] = useProjectSearchParams();
	const { isLoading, error, data: list, retry } = useProjects(
		useDebounce(params, 200)
	);
	const { data: users } = useUser();
	return (
		<Container>
			<Row justify={'space-between'}>
				<h1>Project list</h1>
				<Button
					onClick={() => {
						props.setProjectModalOpen(true);
					}}
				>
					Create Project
				</Button>
			</Row>

			<SearchPanel
				users={users || []}
				param={params}
				setParam={setParams}
			/>

			{error ? (
				<Typography.Text type={'danger'}>
					{error.message}
				</Typography.Text>
			) : null}

			<List
				users={users ?? []}
				dataSource={list ?? []}
				loading={isLoading}
				refresh={retry}
				setProjectModalOpen={props.setProjectModalOpen}
			/>
		</Container>
	);
};
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
	padding: 3.2rem;
`;
