import React from "react";
import { User } from "screens/project-list/search-panel";

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
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Management</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/*undefined.name*/}
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
