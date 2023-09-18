import { Button } from 'antd';
import { useAuth } from 'context/auth-context';
import * as React from 'react';
import { ProjectListScreen } from 'screens/project-list';

function AuthenticatedApp() {
	const { logout } = useAuth();
	return (
		<div>
			<Button onClick={logout}>Logout</Button>
			<ProjectListScreen />
		</div>
	);
}

export default AuthenticatedApp;
