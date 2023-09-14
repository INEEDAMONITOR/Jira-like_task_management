import React from 'react';

function List({ list, users }) {
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
