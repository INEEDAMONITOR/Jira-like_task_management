import { Table } from 'antd';
import React from 'react';
import { User } from 'screens/project-list/search-panel';

interface Project {
	id: string;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
}

interface ListProps {
	list: Project[];
	users: User[];
}

export const List = ({ list, users }: ListProps) => {
	return (
		<Table
			pagination={false}
			columns={[
				{
					title: 'Project',
					dataIndex: 'name',
					key: 'name',
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
				{
					title: 'Manager',
					render(value, project) {
						return (
							<span>
								{users.find(
									(user) => user.id === project.personId
								)?.name || 'Unknown'}
								{}
							</span>
						);
					},
					sorter: (a, b) => a.name.localeCompare(b.name),
				},
			]}
			dataSource={list}
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
