import { Button, Drawer } from 'antd';
import React from 'react';
import { useProjectModal } from './util';

function ProjectModal() {
	const { isOpen, close } = useProjectModal();
	return (
		<Drawer width={'100%'} open={isOpen} onClose={close}>
			<h1>Project Modal</h1>
			<Button onClick={close}>Close</Button>
		</Drawer>
	);
}

export default ProjectModal;
