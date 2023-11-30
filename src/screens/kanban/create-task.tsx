import { useEffect, useState } from 'react';
import { useProjectIdInUrl, useTaskQueryKey } from './util';
import { Card, Input } from 'antd';
import React from 'react';
import { useAddTask } from 'utils/tasks';

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
	const [name, setName] = useState('');
	const projectId = useProjectIdInUrl();
	const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
	const [inputMode, setInputMode] = useState(false);

	const submit = async () => {
		await addTask({ name, projectId, kanbanId });
		setInputMode(false);
		setName('');
	};
	const toggle = () => setInputMode((mode) => !mode);

	useEffect(() => {
		if (!inputMode) {
			setName('');
		}
	}, [inputMode]);

	if (!inputMode) {
		return <div onClick={toggle}>+ Create Task</div>;
	}

	return (
		<Card>
			<Input
				onBlur={toggle}
				placeholder={'next to do'}
				autoFocus={true}
				size={'large'}
				onPressEnter={submit}
				value={name}
				onChange={(evt) => setName(evt.target.value)}
			/>
		</Card>
	);
};
