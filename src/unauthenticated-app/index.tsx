import React, { useState } from 'react';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { Button, Card, Divider, Typography } from 'antd';
import styled from '@emotion/styled';
import logo from 'asset/logo.svg';
import left from 'asset/left.svg';
import right from 'asset/right.svg';
import { useDocumentTitle } from 'utils';
export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	// useDocumentTitle(isRegister ? 'Sign Up' : 'Sign In');
	return (
		<Container>
			<Header />
			<Background />
			<Button
				onClick={() => {
					throw new Error('Click Error');
				}}
			>
				Throw error
			</Button>
			<ShadowCard>
				<Title>Please {isRegister ? 'Sign UP' : 'Sign In'}</Title>

				{error ? (
					<Typography.Text type="danger">
						{error.message}
					</Typography.Text>
				) : (
					<></>
				)}
				{isRegister ? (
					<RegisterScreen onError={setError} />
				) : (
					<LoginScreen onError={setError} />
				)}
				<Divider />

				{isRegister ? 'Have an account? ' : ' '}
				<Button
					type="link"
					onClick={() => {
						setIsRegister((prev) => !prev);
					}}
				>
					{isRegister ? 'Sign In' : 'Sign UP'}
				</Button>
			</ShadowCard>
		</Container>
	);
};

export const LongButton = styled(Button)`
	width: 100%;
`;

const Title = styled.h2`
	margin-bottom: 2.4rem;
	color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
	width: 40rem;
	min-height: 56rem;
	padding: 3.2rem 4rem;
	border-radius: 0.3rem;
	box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
	text-align: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
`;

const Header = styled.header`
	background: url(${logo}) no-repeat center;
	padding: 5rem 0;
	background-size: 8rem;
	width: 100%;
`;

const Background = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: left bottom, right bottom;
	background-size: calc((100vw - 40rem) / 2 - 3.2rem),
		calc((100vw - 40rem) / 2 - 3.2rem), cover;
	background-image: url(${left}), url(${right});
`;
