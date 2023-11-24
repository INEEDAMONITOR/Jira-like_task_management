import {
	Dropdown,
	Menu,
	MenuProps,
	Modal,
	Rate,
	Table,
	TableProps,
} from 'antd';
import { ButtonNoPadding } from 'components/lib';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types/User';
import { useDeleteProject, useEditProject } from 'utils/projects';
import { useProjectModal, useProjectQueryKey } from './util';
import { ColumnsType } from 'antd/lib/table/Table';
import { Project } from 'types/Project';

interface ListProps extends TableProps<Project> {
	users: User[];
	refresh?: () => void;
}
const ListEditMenu = ({ value, project }: { value: any; project: Project }) => {
	const { startEdit } = useProjectModal();
	const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
	const confirmDeleteProject = (id: number) => {
		Modal.confirm({
			title: 'Are you sure to delete this project?',
			content: 'Click YES to delete',
			okText: ' Yes',
			onOk() {
				deleteProject(id);
			},
		});
	};
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Menu>
					<Menu.Item key={'edit'}>
						<ButtonNoPadding
							onClick={() => {
								startEdit(project.id);
							}}
							type={'link'}
						>
							Edit
						</ButtonNoPadding>
					</Menu.Item>
					<Menu.Item
						onClick={() => confirmDeleteProject(project.id)}
						key={'delete'}
					>
						<ButtonNoPadding type={'link'}>delete</ButtonNoPadding>
					</Menu.Item>
				</Menu>
			),
		},
	];
	return (
		<Dropdown menu={{ items }}>
			<ButtonNoPadding type={'link'}>...</ButtonNoPadding>
		</Dropdown>
	);
};

export const List = ({ users, ...props }: ListProps) => {
	const { mutate } = useEditProject(useProjectQueryKey());
	const pinChangeHandler = (id: number, pin: boolean) => {
		mutate({ id, pin });
	};
	const columns: ColumnsType<Project> = [
		{
			title: <Pin checked={true} disabled={true} />,
			dataIndex: 'pin',
			key: 'pin',
			render(value, project) {
				return (
					<Pin
						checked={value}
						onCheckedChange={(pin) => {
							pinChangeHandler(project.id, pin);
						}}
					/>
				);
			},
		},
		{
			title: 'Project',
			dataIndex: 'name',
			render(value, project) {
				return <Link to={String(project.id)}>{value}</Link>;
			},
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: 'Department',
			dataIndex: 'organization',
			key: 'organization',
		},
		{
			title: 'Manager',
			key: 'personId',
			render(_, project) {
				return (
					<span>
						{users.find((user) => user.id === project.personId)
							?.name || 'Unknown'}
					</span>
				);
			},
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: 'Created Time',
			render(_, project) {
				return (
					<span>
						{project.created
							? dayjs(project.created).format('MMM DD, YYYY')
							: 'Unknown'}
					</span>
				);
			},
			key: 'created',
			sorter: (a, b) => a.created - b.created,
		},
		{
			render(value, project) {
				return <ListEditMenu value={value} project={project} />;
			},
		},
	];

	return (
		<Table
			{...props}
			pagination={false}
			rowKey={(record) => {
				return record.id;
			}}
			columns={columns}
		/>
	);
};
