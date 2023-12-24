import { http, HttpResponse } from 'msw';
import * as accountDB from '../data/account';
import { bootstrap } from '../bootstrap';
import { ServerError } from '../util';

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = (req) =>
	req.headers.get('Authorization')?.replace('Bearer ', '');

export async function getUser(req) {
	const token = getToken(req);
	if (!token) {
		const error = new ServerError('A token must be provided');
		error.status = 401;
		throw error;
	}
	let userId;
	try {
		userId = atob(token);
	} catch (e) {
		const error = new ServerError('Invalid token. Please login again.');
		error.status = 401;
		throw error;
	}
	return await accountDB.read(+userId);
}

export const userHandlers = [
	http.get(`${apiUrl}/me`, async ({ request }) => {
		const user = await getUser(request);
		const token = getToken(request);
		return HttpResponse.json({ user: { ...user, token } });
	}),
	http.post(`${apiUrl}/login`, async ({ request }) => {
		const { username, password } = await request.json();
		const user = await accountDB.authenticate({ name: username, password });
		return HttpResponse.json({ user });
	}),

	http.post(`${apiUrl}/register`, async ({ request }) => {
		const { username, password } = await request.json();
		const userFields = { name: username, password };
		await accountDB.create(userFields);
		let user;
		try {
			user = await accountDB.authenticate(userFields);
			bootstrap(user.id);
		} catch (error) {
			return HttpResponse(error.message, {
				status: error.status,
				headers: {
					'Content-Type': 'text/plain',
				},
			});
		}
		return HttpResponse.json({ user });
	}),
];
