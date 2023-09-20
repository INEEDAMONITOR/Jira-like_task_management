import styled from '@emotion/styled';
import { Button, Dropdown, Menu, Space } from 'antd';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import * as React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as SoftwareLogo } from 'asset/software-logo.svg';
function AuthenticatedApp() {
	const { logout, user } = useAuth();
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
					<h3>Projects</h3>
					<h3>Users</h3>
				</HeaderLeft>
				<HeaderRight>
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key={'logout'}>
									<Button onClick={logout} type="link">
										Logout
									</Button>
								</Menu.Item>
							</Menu>
						}
					>
						<Button type="link">Hi, {user?.name}</Button>
					</Dropdown>
				</HeaderRight>
			</Header>
			<Main>
				<ProjectListScreen />
			</Main>
		</Container>
	);
}

export default AuthenticatedApp;

const Container = styled.div`
	display: grid; //	使用grid
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
