import { useForm } from 'antd/lib/form/Form';
import * as React from 'react';
import { useTaskModal, useTaskQueryKey } from './util';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { UserSelect } from 'components/user-select';
import { ProjectsSelect } from 'components/project-select';
import { useDeleteTask, useEditTask } from 'utils/tasks';
import { useEffect } from 'react';
import { TaskTypeSelect } from 'components/task-type-select';

export const TaskModal = () => {
	const [form] = useForm();
	const {
		isOpen,
		close,
		editingTask,
		editingTaskId,
		isLoading,
	} = useTaskModal();
	const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
		useTaskQueryKey()
	);
	const { mutateAsync: deleteTask, isLoading: deleteLoading } = useDeleteTask(
		useTaskQueryKey()
	);

	const onOkEditTaskHandler = async () => {
		await editTask({ ...editingTask, ...form.getFieldsValue() });
		close();
		form.resetFields();
	};
	const onCancelEditTaskHandler = () => {
		close();
		form.resetFields();
	};
	const deleteHandler = async () => {
		close();
		Modal.confirm({
			okText: 'Delete',
			cancelText: 'Cancel',
			title: 'Confirm delete task',
			onOk() {
				return deleteTask({ id: Number(editingTaskId) });
			},
		});
	};

	useEffect(() => {
		form.setFieldsValue(editingTask);
	}, [editingTask, form]);

	return (
		<>
			<Modal
				forceRender={true}
				title="Edit Task"
				confirmLoading={editLoading}
				open={isOpen}
				onCancel={onCancelEditTaskHandler}
				onOk={onOkEditTaskHandler}
			>
				{isLoading ? (
					<Spin size="large" />
				) : (
					<>
						<Form
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={editingTask}
							form={form}
						>
							<Form.Item label="Task Name" name="name">
								<Input />
							</Form.Item>

							<Form.Item label="Project Belong" name="projectId">
								<ProjectsSelect />
							</Form.Item>

							<Form.Item label="Agent" name="processorId">
								<UserSelect />
							</Form.Item>
							<Form.Item label="Type" name="typeId">
								<TaskTypeSelect />
							</Form.Item>
						</Form>
					</>
				)}
				<div style={{ textAlign: 'right' }}>
					<Button onClick={deleteHandler}>Delete</Button>
				</div>
			</Modal>
		</>
	);
};

export default TaskModal;
