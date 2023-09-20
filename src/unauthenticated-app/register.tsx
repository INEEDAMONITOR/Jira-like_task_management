import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React, { FormEvent, useState } from 'react';
import { LongButton } from 'unauthenticated-app';
import { cleanObject } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({
	onError,
}: {
	onError: React.Dispatch<React.SetStateAction<Error | null>>;
}) => {
	const { register } = useAuth();
	const [confirmPassword, setConfirmPassword] = useState(true);
	// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const username = (event.currentTarget.elements[0] as HTMLInputElement)
	// 		.value;
	// 	const password = (event.currentTarget.elements[1] as HTMLInputElement)
	// 		.value;
	// 	register({ username, password });
	// };
	const handleSubmit = ({
		confirmPassword,
		...values
	}: {
		username: string;
		password: string;
		confirmPassword: string;
	}) => {
		if (values.password !== confirmPassword) {
			setConfirmPassword(false);
		} else {
			setConfirmPassword(true);
			register(values).catch(onError);
		}
	};

	return (
		// <form onSubmit={handleSubmit}>
		// 	<div>
		// 		<label htmlFor="username">User name</label>
		// 		<input type="text" id={'username'} />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="password">Password</label>
		// 		<input type="password" id={'password'} />
		// 	</div>
		// 	<button type={'submit'}>Register</button>
		// </form>
		<Form onFinish={handleSubmit}>
			<Form.Item
				name={'username'}
				rules={[{ required: true, message: 'Please input username' }]}
			>
				{/* <label htmlFor="username">User name</label> */}
				<Input placeholder="Username" type="text" id={'username'} />
			</Form.Item>

			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Please input password' }]}
			>
				<Input placeholder="Password" type="password" id={'password'} />
			</Form.Item>

			<Form.Item
				name={'confirmPassword'}
				rules={[
					{
						required: true,
						message: 'Please confirm password',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error('Passwords do not match!')
							);
						},
					}),
				]}
			>
				<Input
					placeholder="Confirm Password"
					type="password"
					id={'confirmPassword'}
				/>
			</Form.Item>

			<LongButton htmlType={'submit'} type="primary">
				Sign Up
			</LongButton>
		</Form>
	);
};
