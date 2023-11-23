import * as React from 'react';
import { AuthProvider } from './auth-context';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
// Root level context provider
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};
