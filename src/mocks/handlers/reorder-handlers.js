import { http, HttpResponse } from 'msw';
import { kanbanDB, taskDB } from '../data/rest';

const apiUrl = process.env.REACT_APP_API_URL;
export const reorderHandlers = [
	http.post(`${apiUrl}/kanbans/reorder`, async ({ request: req }) => {
		const { fromId, referenceId, type } = await req.json();
		await kanbanDB.reorder({ fromId, referenceId, type });
		return HttpResponse.json({});
	}),
	http.post(`${apiUrl}/tasks/reorder`, async ({ request }) => {
		const {
			type,
			fromId: fromTaskId,
			referenceId,
			fromKanbanId,
			toKanbanId,
		} = await request.json();
		if (fromKanbanId !== toKanbanId) {
			await taskDB.update(fromTaskId, { kanbanId: toKanbanId });
		}
		await taskDB.reorder({ type, fromId: fromTaskId, referenceId });
		return HttpResponse.json({});
	}),
];
