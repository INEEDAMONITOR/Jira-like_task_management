import { Button, Drawer } from 'antd';
import React from 'react';

function ProjectModal(props: {
	projectModalOpen: boolean;
	onClose: () => void;
}) {
	return (
		<Drawer
			width={'100%'}
			open={props.projectModalOpen}
			onClose={props.onClose}
		>
			<h1>Project Modal</h1>
			<Button onClick={props.onClose}>Close</Button>
		</Drawer>
	);
}

export default ProjectModal;
