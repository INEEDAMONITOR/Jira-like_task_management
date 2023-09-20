import * as React from 'react';
import { AuthProvider } from './auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';
// Root level context provider
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};
