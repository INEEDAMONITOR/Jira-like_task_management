import { http, HttpResponse } from 'msw';
import { getUser } from './account';
import { taskTypeDB } from '../data/rest';
const apiUrl = process.env.REACT_APP_API_URL;

// Helper function to convert values to numbers
const tryToNumber = (value) =>
	Array.isArray(value) ? value.map(Number) : Number(value);

// Helper function to convert object property values to numbers if they contain 'Id'
const convertIds = (object) => {
	const result = {};
	Object.keys(object).forEach((key) => {
		// If it contains Id, such as personId, it needs to be converted to a number
		result[key] = key.includes('Id')
			? tryToNumber(object[key])
			: object[key];
	});
	result.id = tryToNumber(result.id);
	return result;
};

// Export the function getRestHandlers
export const getRestHandlers = (endpoint, db) => {
	return [
		// Handler for querying a list of items
		http.get(`${apiUrl}/${endpoint}`, async ({ request }) => {
			const user = await getUser(request);
			const params = request.url.searchParams
				? request.url.searchParams
				: [];
			const queryResult = db.queryByOwnerId(
				user.id,
				Object.fromEntries(params)
			);
			return HttpResponse.json(queryResult);
		}),
		// Handler for querying a single item
		http.get(`${apiUrl}/${endpoint}/:id`, async ({ _, params }) => {
			const item = db.detail(+params.id);
			return HttpResponse.json(item);
		}),
		// Handler for updating an item
		http.patch(`${apiUrl}/${endpoint}/:id`, async ({ request, params }) => {
			const { id } = convertIds(params);
			const updates = await request.json();
			const updatedItem = db.update(id, updates);
			return HttpResponse.json(updatedItem);
		}),
		// Handler for deleting an item
		http.delete(`${apiUrl}/${endpoint}/:id`, async ({ _, params }) => {
			const { id } = convertIds(params);
			db.remove(id);
			return HttpResponse.json({ success: true });
		}),
		// Handler for creating a new item
		http.post(`${apiUrl}/${endpoint}`, async ({ request }) => {
			const user = await getUser(request);
			const body = await request.json();
			let targetAddItem = Object.assign(body, {
				ownerId: user.id,
				created: new Date().getTime(),
			});
			if (endpoint === 'tasks') {
				targetAddItem = {
					...targetAddItem,
					reporterId: user.id,
					typeId: taskTypeDB.queryByOwnerId(user.id)[0].id,
					created: new Date().getTime(),
				};
			}
			const detail = await db.create(convertIds(targetAddItem));
			return HttpResponse.json(detail);
		}),
	];
};
