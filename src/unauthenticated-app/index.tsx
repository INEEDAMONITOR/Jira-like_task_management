import React, { useState } from 'react';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import { logout } from 'auth-provider';

export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false);
	return (
		<div>
			{isRegister ? <RegisterScreen /> : <LoginScreen />}
			<button
				onClick={() => {
					setIsRegister((prev) => !prev);
				}}
			>
				Switch to {isRegister ? 'Register' : 'Login'}
			</button>
		</div>
	);
};
