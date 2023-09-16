import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { LoginScreen } from 'unauthenticated-app/login';
import { useAuth } from 'context/auth-context';
import AuthenticatedApp from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';

function App() {
	const { user } = useAuth();
	console.log(user);
	return (
		<div className="App">
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</div>
	);
}

export default App;
