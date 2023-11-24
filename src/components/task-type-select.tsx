import * as React from 'react';
import useUser from 'utils/user';
import { IdSelect } from './id-select';
import { useTaskTypes } from 'utils/task-types';
export const TaskTypeSelect = (
	props: React.ComponentProps<typeof IdSelect>
) => {
	const { data: types } = useTaskTypes();
	return <IdSelect options={types || []} {...props}></IdSelect>;
};
