import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'screens/project-list/search-panel';

export interface Project {
	id: number;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
	created: number;
}

interface ListProps extends TableProps<Project> {
	users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
	return (
		<Table
			{...props}
			pagination={false}
			columns={[
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
	// return (
	// 	<table>
	// 		<thead>
	// 			<tr>
	// 				<th>Project</th>
	// 				<th>Management</th>
	// 			</tr>
	// 		</thead>
	// 		<tbody>
	// 			{list.map((project) => (
	// 				<tr key={project.id}>
	// 					<td>{project.name}</td>
	// 					{/*undefined.name*/}
	// 					<td>
	// 						{users.find((user) => user.id === project.personId)
	// 							?.name || 'Unknown'}
	// 					</td>
	// 				</tr>
	// 			))}
	// 		</tbody>
	// 	</table>
	// );
};
