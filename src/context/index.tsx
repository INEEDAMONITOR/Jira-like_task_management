import * as React from 'react';
import { AuthProvider } from './auth-context';

// Root level context provider
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};
