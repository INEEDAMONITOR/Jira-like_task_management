import React from 'react';
import { SearchPanel } from 'screens/project-list/search-panel';
import { List } from 'screens/project-list/list';
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled';
import { Typography, Row } from 'antd';
import { useProjects } from 'utils/projects';
import useUser from 'utils/user';
import { useProjectModal, useProjectSearchParams } from './util';
import { ButtonNoPadding, ErrorBox } from 'components/lib';

export const ProjectListScreen = () => {
	useDocumentTitle('Project list', false);
	const [params, setParams] = useProjectSearchParams();
	const { isLoading, error, data: list } = useProjects(
		useDebounce(params, 200)
	);
	const { data: users } = useUser();
	const { open } = useProjectModal();
	return (
		<Container>
			<Row justify={'space-between'}>
				<h1>Project list</h1>
				<ButtonNoPadding onClick={() => open()} type="link">
					Create
				</ButtonNoPadding>
			</Row>

			<SearchPanel
				users={users || []}
				param={params}
				setParam={setParams}
			/>
			<ErrorBox error={error} />

			<List
				users={users ?? []}
				dataSource={list ?? []}
				loading={isLoading}
			/>
		</Container>
	);
};
// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
	padding: 3.2rem;
	flex: 1;
`;
