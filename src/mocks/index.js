import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { http, HttpResponse } from 'msw';
import packageJson from '../../package.json';

export const startServer = async () => {
	const server = setupWorker(...handlers);
	server.start({
		serviceWorker: {
			url: '/mockServiceWorker.js',
		},
	});
};
export const loadMockServer = (callback) => {
	startServer().then(() => {
		if (callback) {
			callback();
		}
	});
};
