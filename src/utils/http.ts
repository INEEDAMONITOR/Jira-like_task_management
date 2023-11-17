import { useAuth } from 'context/auth-context';
import QueryString from 'qs';
import * as auth from 'auth-provider';
import { useCallback } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
	data?: object;
	token?: string;
}
/**
 *
 * @param endpoint
 * @param {data, token, headers, ...customConfig}
 * @returns
 */
export const http = async (
	endpoint: string,
	{ data, token, headers, ...customConfig }: Config = {}
) => {
	const config = {
		method: 'GET', // Method default: GET, but can be overwrite by customConfig
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : '',
		},
		...customConfig,
	};

	if (config.method.toUpperCase() === 'GET') {
		endpoint += `?${QueryString.stringify(data)}`;
	} else {
		config.body = JSON.stringify(data || {});
	}

	return window
		.fetch(`${apiUrl}/${endpoint}`, config)
		.then(async (response) => {
			if (response.status === 401) {
				await auth.logout();
				window.location.reload();
				return Promise.reject({ message: 'Please login again' });
			}

			const data = await response.json();

			if (response.ok) {
				return data;
			} else {
				return Promise.reject(data);
			}
		});
};

export const useHttp = () => {
	const { user } = useAuth();
	return useCallback(
		(...[endpoint, config]: Parameters<typeof http>) =>
			http(endpoint, { ...config, token: user?.token }),
		[user?.token]
	);
};
