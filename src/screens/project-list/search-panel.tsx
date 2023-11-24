/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Form, Input, Select } from 'antd';
import React from 'react';
import { Project } from 'types/Project';
import { UserSelect } from 'components/user-select';
import { useDebounce } from 'utils';
import { User } from 'types/User';

interface SearchPanelProps {
	users: User[];
	param: Partial<Pick<Project, 'name' | 'personId'>>;
	setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
	return (
		<Form layout={'inline'} css={{ marginBottom: '2rem' }}>
			{/* Input Search */}
			<Form.Item>
				{/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
				<Input
					placeholder="Project name"
					type="text"
					value={param.name}
					onChange={(evt) =>
						setParam({
							...param,
							name: evt.target.value,
						})
					}
				/>
			</Form.Item>

			{/* Select Box */}
			<Form.Item>
				<UserSelect
					defaultOptionName="Manage"
					value={param.personId}
					onChange={(value) =>
						setParam({
							...param,
							personId: value,
						})
					}
				/>
				{/* <Select
					value={param.personId}
					onChange={(value) =>
						setParam({
							...param,
							personId: value,
						})
					}
				>
					<Select.Option value={''}>Manager</Select.Option>
					{users.map((user) => (
						<Select.Option key={user.id} value={String(user.id)}>
							{user.name}
						</Select.Option>
					))}
				</Select> */}
			</Form.Item>
		</Form>
	);
};
