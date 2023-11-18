import { useCallback, useReducer, useState } from 'react';
enum UndoActionType {
	UNDO = 'UNDO',
	REDO = 'REDO',
	SET = 'SET',
	RESET = 'RESET',
}
type UndoState<T> = {
	past: T[];
	present: T;
	future: T[];
};
type UndoAction<T> =
	| { newPresent: T; type: UndoActionType.SET | UndoActionType.RESET }
	| {
			type: Exclude<
				UndoActionType,
				UndoActionType.SET | UndoActionType.RESET
			>;
	  };
const createUndoReducer = <T>() => (
	state: UndoState<T>,
	action: UndoAction<T>
): UndoState<T> => {
	const { type } = action;
	// [...past] present [...future]
	switch (type) {
		case UndoActionType.UNDO: {
			const { past, present, future } = state;
			if (past.length === 0) return state;

			const prev = past[past.length - 1];
			past.pop();
			future.unshift(present);
			return {
				past: past,
				present: prev,
				future: future,
			};
		}
		case UndoActionType.REDO: {
			const { past, present, future } = state;
			if (future.length === 0) return state;

			const prev = future[0];
			future.unshift();
			past.push(present);
			return {
				past: past,
				present: prev,
				future: future,
			};
		}
		case UndoActionType.SET: {
			const { past, present } = state;
			if (action.newPresent === present) {
				return state;
			}
			past.push(present);
			return { past: past, present: action.newPresent, future: [] };
		}
		case UndoActionType.RESET: {
			return {
				past: [],
				present: action.newPresent,
				future: [],
			};
		}
	}
	return state;
};

export const useUndo = <T>(initPresent: T) => {
	const [state, dispatch] = useReducer(createUndoReducer<T>(), {
		past: [],
		present: initPresent,
		future: [],
	} as UndoState<T>);

	const undo = useCallback(() => dispatch({ type: UndoActionType.UNDO }), []);
	const redo = useCallback(() => dispatch({ type: UndoActionType.REDO }), []);
	const set = useCallback(
		(newPresent: T) => dispatch({ type: UndoActionType.SET, newPresent }),
		[]
	);
	const reset = useCallback(
		(newPresent: T) => dispatch({ newPresent, type: UndoActionType.RESET }),
		[]
	);
	// const [state, setState] = useState<{
	// 	past: T[];
	// 	present: T;
	// 	future: T[];
	// }>({
	// 	past: [],
	// 	present: initPresent,
	// 	future: [],
	// });

	// const canUndo = state.past.length !== 0;
	// const canRedo = state.future.length !== 0;
	// const undo = useCallback(() => {
	// 	if (!canUndo) return;
	// 	setState((prev) => {
	// 		const previous = prev.past[prev.past.length - 1];
	// 		const newPast = prev.past.slice(0, prev.past.length - 1);
	// 		prev.past = newPast;
	// 		prev.present = previous;
	// 		prev.future.unshift(prev.present);
	// 		return { ...prev };
	// 	});
	// }, [canUndo]);

	// const redo = useCallback(() => {
	// 	if (!canRedo) return;

	// 	setState((prev) => {
	// 		const oldCurr = prev.present;
	// 		const curr = prev.future[0];
	// 		prev.past.push(oldCurr);
	// 		prev.future.shift();
	// 		prev.present = curr;
	// 		return { ...prev };
	// 	});
	// }, [canRedo]);

	// const set = useCallback((newPresent: T) => {
	// 	setState((prev) => {
	// 		if (newPresent === prev.present) {
	// 			return prev;
	// 		}
	// 		prev.past.push(prev.present);
	// 		prev.present = newPresent;
	// 		prev.future = [];
	// 		return { ...prev };
	// 	});
	// }, []);

	// const reset = useCallback((newPresent: T) => {
	// 	setState((prev) => {
	// 		prev.past = [];
	// 		prev.future = [];
	// 		prev.present = newPresent;
	// 		return { ...prev };
	// 	});
	// }, []);
	// return [{ state }, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
