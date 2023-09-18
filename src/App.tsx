import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { LoginScreen } from 'unauthenticated-app/login';
import { useAuth } from 'context/auth-context';
import AuthenticatedApp from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { Button } from 'antd';

function App() {
	const { user } = useAuth();
	return (
		<div className="App">
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</div>
	);
}

export default App;
