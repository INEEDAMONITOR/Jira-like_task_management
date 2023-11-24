import styled from '@emotion/styled';
import { Menu, MenuProps } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const useRouteType = () => {
	const units = useLocation().pathname.match(/(?<=\/)\w+$/);
	return units ? units[0] : '';
};

export const ProjectScreen = () => {
	const routeType = useRouteType();
	return (
		<Container>
			<Aside>
				<Menu mode="inline" selectedKeys={[routeType]}>
					<Menu.Item key={'kanban'}>
						<Link to={'kanban'}>Kanban Board</Link>
					</Menu.Item>

					<Menu.Item key={'epic'}>
						<Link to={'epic'}>Epic</Link>
					</Menu.Item>
				</Menu>
			</Aside>
			<Main>
				<Outlet />
			</Main>
		</Container>
	);
};

const Aside = styled.aside`
	background-color: rgb(244, 245, 247);
	display: flex;
	flex-direction: column;
`;

const Main = styled.div`
	box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
	display: flex;
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 16rem 1fr;
`;
