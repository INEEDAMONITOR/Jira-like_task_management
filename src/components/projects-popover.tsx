import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useProjects } from 'utils/projects';
import { ButtonNoPadding } from './lib';
import { projectListActions, projectListSlice } from 'store/project-list.slice';

function ProjectPopover() {
	const dispatch = useDispatch();

	const { data: projects, isLoading } = useProjects();
	const pinnedProjects = projects?.filter((project) => project.pin === true);
	const content = (
		<ContentContainer>
			<Typography.Text type={'secondary'}>
				Pinned Projects
			</Typography.Text>
			<List>
				{pinnedProjects?.map((project) => (
					<List.Item key={project.id}>
						<List.Item.Meta title={project.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			<ButtonNoPadding
				onClick={() => dispatch(projectListActions.openProjectModal())}
				type={'link'}
			>
				Create
			</ButtonNoPadding>
		</ContentContainer>
	);
	return (
		<Popover placement={'bottom'} content={content}>
			Project
		</Popover>
	);
}

const ContentContainer = styled.div`
	min-width: 30rem;
`;

export default ProjectPopover;
