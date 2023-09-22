import { Rate, Table, TableProps } from 'antd';
import { Pin } from 'components/pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'screens/project-list/search-panel';
import { useEditProjects } from 'utils/projects';

export interface Project {
	id: number;
	name: string;
	personId: number;
	pin: boolean;
	organization: string;
	created: number;
}

interface ListProps extends TableProps<Project> {
	users: User[];
	refresh?: () => void;
}

export const List = ({ users, refresh, ...props }: ListProps) => {
	const { mutate } = useEditProjects();
	const pinChangeHandler = (id: number, pin: boolean) => {
		mutate({ id, pin }).then(refresh);
	};
	return (
		<Table
			{...props}
			pagination={false}
			columns={[
				{
					title: <Pin checked={true} disabled={true} />,
					dataIndex: 'pin',
					key: 'id',
					render(value, project) {
						return (
							<Pin
								checked={value}
								onCheckedChange={(pin) => {
									console.log(pin);
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
					render(_, project) {
						return (
							<span>
								{users.find(
									(user) => user.id === project.personId
								)?.name || 'Unknown'}
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
									? dayjs(project.created).format(
											'MMM DD, YYYY'
									  )
									: 'Unknown'}
							</span>
						);
					},
					key: 'created-time',
					sorter: (a, b) => a.created - b.created,
				},
			]}
		/>
	);
};
