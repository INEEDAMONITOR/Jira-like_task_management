import React from 'react';
import { User } from './search-panel';
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
function List({ list, users }: ListProps) {
	return (
		<table>
			<thead>
				<tr>
					<th>Project</th>
					<th>Manager</th>
				</tr>
			</thead>
			<tbody>
				{list.map((project) => {
					return (
						<tr key={project.id}>
							<td>{project.name}</td>
							<td>
								{users.find(
									(user) => user.id === project.personId,
								)?.name || 'Cannot find manager'}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default List;
