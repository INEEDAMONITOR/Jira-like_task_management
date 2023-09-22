/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Form, Input, Select } from 'antd';
import React from 'react';

export interface User {
	id: string;
	name: string;
	email: string;
	title: string;
	organization: string;
	token: string;
}

interface SearchPanelProps {
	users: User[];
	param: {
		name: string;
		personId: string;
	};
	setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
	// console.log(users[0].name);
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
				<Select
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
				</Select>
			</Form.Item>
		</Form>
	);
};
