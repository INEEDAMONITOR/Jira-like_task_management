import styled from '@emotion/styled';
import { Button, Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from 'utils/projects';
import { ButtonNoPadding } from './lib';
import { useProjectModal } from 'screens/project-list/util';
function ProjectPopover() {
	const { data: projects, isLoading } = useProjects();
	const pinnedProjects = projects?.filter((project) => project.pin === true);
	const { open } = useProjectModal();

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
				onClick={() => {
					open();
				}}
				type="link"
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
