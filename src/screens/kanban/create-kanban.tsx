import { useState } from 'react';
import { useKanbanQueryKey, useProjectIdInUrl } from './util';
import { useAddKanban } from 'utils/kanban';
import { Input } from 'antd';
import React from 'react';
import { Container } from './kanban-column';

export const CreateKanban = () => {
	const [name, setName] = useState('');
	const projectId = useProjectIdInUrl();
	const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
	const submit = async () => {
		await addKanban({ name, projectId });
		setName('');
	};

	return (
		<Container>
			<Input
				size={'large'}
				placeholder={'Kanban name'}
				onPressEnter={submit}
				value={name}
				onChange={(evt) => setName(evt.target.value)}
			></Input>
		</Container>
	);
};
