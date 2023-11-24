import { Button, Drawer, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useProjectModal, useProjectQueryKey } from './util';
import { UserSelect } from 'components/user-select';
import { useAddProject, useEditProject } from 'utils/projects';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';

export default function ProjectModal() {
	const { isOpen, close, editingProject, isLoading } = useProjectModal();
	const useMutateProject = editingProject ? useEditProject : useAddProject;

	const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
		useProjectQueryKey()
	);
	const [form] = useForm();
	const onFinish = (values: any) => {
		mutateAsync({ ...editingProject, ...values }).then(() => {
			form.resetFields();
			close();
		});
	};

	const title = editingProject ? 'Edit Project' : 'Create Project';
	const closeHandler = () => {
		form.resetFields();
		close();
	};
	useEffect(() => {
		form.setFieldsValue(editingProject);
	}, [editingProject, form]);

	return (
		<Drawer
			forceRender={true}
			width={'100%'}
			open={isOpen}
			onClose={closeHandler}
		>
			<Container>
				{isLoading ?? <Spin size={'large'} />}
				<h1>{title}</h1>
				<ErrorBox error={error} />
				<Form
					layout="vertical"
					style={{ width: '40rem' }}
					onFinish={onFinish}
					form={form}
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[
							{
								required: true,
								message: 'Please input project name',
							},
						]}
					>
						<Input placeholder="Please input project name" />
					</Form.Item>
					<Form.Item
						label="Department"
						name="organization"
						rules={[
							{
								required: true,
								message: 'Please input department name',
							},
						]}
					>
						<Input placeholder="Please input department name" />
					</Form.Item>
					<Form.Item label="Manager" name="personId">
						<UserSelect defaultOptionName={'Manager'} />
					</Form.Item>
					<Form.Item style={{ textAlign: 'right' }}>
						<Button
							loading={mutateLoading}
							type={'primary'}
							htmlType={'submit'}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Container>
		</Drawer>
	);
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
