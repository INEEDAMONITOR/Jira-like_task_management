import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
import { cleanObject } from 'utils';
import { Button, Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
	onError,
}: {
	onError: React.Dispatch<React.SetStateAction<Error | null>>;
}) => {
	// const login = (param: { username: string; password: string }) => {
	//   fetch(`${apiUrl}/register`, {
	//     method: "POST",
	//     headers: {
	//       "Content-Type": "application/json",
	//     },
	//     body: JSON.stringify(param),
	//   }).then(async (response) => {
	//     if (response.ok) {
	//     }
	//   });
	// };

	const { login, user } = useAuth();
	const { run, isLoading } = useAsync(undefined, { throwOnError: true });
	// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const username = (event.currentTarget.elements[0] as HTMLInputElement)
	// 		.value;
	// 	const password = (event.currentTarget.elements[1] as HTMLInputElement)
	// 		.value;
	// 	login({ username, password });
	// };
	const handleSubmit = (values: { username: string; password: string }) => {
		run(login(values).catch(onError));
	};

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item
				name={'username'}
				rules={[{ required: true, message: 'Please input user name' }]}
			>
				{/* <label htmlFor="username">User name</label> */}
				<Input placeholder="Username" type="text" id={'username'} />
			</Form.Item>
			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Please input user name' }]}
			>
				{/* <label htmlFor="password">Password</label> */}
				<Input placeholder="Password" type="password" id={'password'} />
			</Form.Item>
			<LongButton
				loading={isLoading}
				htmlType={'submit'}
				type={'primary'}
			>
				Sign In
			</LongButton>
		</Form>
	);
};
