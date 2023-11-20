import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	projectListActions,
	selectProjectModalOpen,
} from '../../store/project-list.slice';

function ProjectModal() {
	const dispatch = useDispatch();
	const projectModalOpen = useSelector(selectProjectModalOpen);
	return (
		<Drawer
			width={'100%'}
			onClose={() => dispatch(projectListActions.closeProjectModal())}
			open={projectModalOpen}
		>
			<h1>Project Modal</h1>
			<Button
				onClick={() => dispatch(projectListActions.closeProjectModal())}
			>
				Close
			</Button>
		</Drawer>
	);
}

export default ProjectModal;
