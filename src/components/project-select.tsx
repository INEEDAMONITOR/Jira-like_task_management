import * as React from 'react';
import { IdSelect } from './id-select';
import { useProjects } from 'utils/projects';
export const ProjectsSelect = (
	props: React.ComponentProps<typeof IdSelect>
) => {
	const { data: projects } = useProjects();
	return <IdSelect options={projects || []} {...props}></IdSelect>;
};
