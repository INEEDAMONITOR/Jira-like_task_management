import styled from '@emotion/styled';
import { Button, Dropdown, Menu, MenuProps, Space, message } from 'antd';
import { ButtonNoPadding, Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import * as React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as SoftwareLogo } from 'asset/software-logo.svg';
import {
	Navigate,
	Route,
	Router,
	RouterProvider,
	Routes,
	redirect,
	useNavigate,
} from 'react-router';
import ProjectScreen from 'screens/project';
import { createBrowserRouter } from 'react-router-dom';
import { KanbanScreen } from 'screens/kanban';
import EpicScreen from 'screens/epic';
import { resetRoute, useMount, useMountRef } from 'utils';
import { useMemo, useState } from 'react';
import ProjectModal from 'screens/project-list/project-modal';
import ProjectPopover from 'components/projects-popover';

export default function AuthenticatedApp() {
	const router = useMemo(
		() =>
			createBrowserRouter([
				{
					path: '/',
					element: <Navigate to={'/projects'} replace={true} />,
				},
				{
					path: '/projects',
					element: <ProjectListScreen />,
				},
				{
					path: '/projects/:projectID',
					element: <ProjectScreen />,
					children: [
						{
							path: 'kanban',
							element: <KanbanScreen />,
						},
						{
							path: 'epic',
							element: <EpicScreen />,
						},
					],
				},
			]),
		[]
	);
	return (
		<Container>
			<PageHeader />
			<Main>
				<RouterProvider router={router} />
			</Main>

			<ProjectModal />
		</Container>
	);
}

type Return = Pick<ReturnType<typeof useAuth>, 'user' | 'logout'>;
const PageHeader = () => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<ButtonNoPadding
					type="link"
					onClick={() => {
						resetRoute();
					}}
				>
					<SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
				</ButtonNoPadding>
				<ProjectPopover />
				<h3>Users</h3>
			</HeaderLeft>
			<HeaderRight>
				<User />
			</HeaderRight>
		</Header>
	);
};
const User = () => {
	const { logout, user } = useAuth();
	const items: MenuProps['items'] = [
		{
			label: 'logout',
			key: 'logout',
		},
	];
	console.log(user);
	const onClick: MenuProps['onClick'] = ({ key }) => {
		// Logout
		if (key === 'logout') {
			logout();
		}
	};
	return (
		<Dropdown menu={{ items, onClick }}>
			<Button type="link">Hi, {user?.name}</Button>
		</Dropdown>
	);
};
const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr 6rem; // rows：1st row, 2se row, 3th row
	height: 100 vh;
`;
const Header = styled(Row)`
	padding: 3.2rem;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
	height: calc(100vh - 6rem);
`;
