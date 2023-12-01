import React, { useCallback } from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans, useReorderKanban, useReorderTask } from 'utils/kanban';
import {
	useKanbanSearchParam,
	useKanbanQueryKey,
	useProjectInUrl,
	useTaskQueryKey,
	useTaskSearchParam,
} from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';
import SearchPanel from './search-panel';
import { ScreenContainerWithPadding } from 'components/lib';
import { Spin } from 'antd';
import { useTasks } from 'utils/tasks';
import { CreateKanban } from './create-kanban';
import TaskModal from './task-modal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';

export const KanbanScreen = () => {
	useDocumentTitle('Kanban');
	const { data: kanbans, isLoading: isKanbanLoading } = useKanbans(
		useKanbanSearchParam()
	);
	const { data: currentProject } = useProjectInUrl();
	const { isLoading: isTaskLoading } = useTasks(useTaskSearchParam());
	const onDragEnd = useDragEnd();
	const isLoading = isTaskLoading || isKanbanLoading;
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<ScreenContainerWithPadding>
				<h1>{currentProject?.name} Kanban</h1>
				<SearchPanel />

				{isLoading ? (
					<Spin size="large" />
				) : (
					<ColumnContainer>
						<Drop
							type={'COLUMN'}
							direction={'horizontal'}
							droppableId={'kanban'}
						>
							<DropChild style={{ display: 'flex' }}>
								{kanbans?.map((kanban, index) => {
									return (
										<Drag
											key={kanban.id}
											draggableId={`kanban${kanban.id}`}
											index={index}
										>
											<KanbanColumn
												key={kanban.id}
												kanban={kanban}
											/>
										</Drag>
									);
								})}
							</DropChild>
						</Drop>
						<CreateKanban />
					</ColumnContainer>
				)}
				<TaskModal />
			</ScreenContainerWithPadding>
		</DragDropContext>
	);
};

export const useDragEnd = () => {
	const { data: kanbans } = useKanbans(useKanbanSearchParam());
	const { data: allTasks = [] } = useTasks(useTaskSearchParam());
	const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey());
	const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
	return useCallback(
		({ source, destination, type }: DropResult) => {
			if (!destination) {
				return;
			}
			// sort Kanban
			if (type === 'COLUMN') {
				const sourceId = kanbans?.[source.index].id;
				const destinationId = kanbans?.[destination.index].id;
				if (!sourceId || !destinationId || sourceId === destinationId) {
					return;
				}
				const type =
					destination.index > source.index ? 'after' : 'before';
				reorderKanban({
					fromId: sourceId,
					referenceId: destinationId,
					type,
				});
			}
			// sort Task
			if (type === 'ROW') {
				const fromKanbanId = Number(
					source.droppableId.match(/(?<=kanban)\d+(?=Tasks)/)?.[0]
				);
				const toKanbanId = Number(
					destination.droppableId.match(
						/(?<=kanban)\d+(?=Tasks)/
					)?.[0]
				);
				const fromTask = allTasks.filter(
					(task) => task.kanbanId === fromKanbanId
				)[source.index];
				const toTask = allTasks.filter(
					(task) => task.kanbanId === toKanbanId
				)[destination.index];
				if (fromTask?.id === toTask?.id) {
					return;
				}
				reorderTask({
					fromId: fromTask?.id,
					referenceId: toTask?.id,
					fromKanbanId,
					toKanbanId,
					type:
						fromKanbanId === toKanbanId &&
						destination.index > source.index
							? 'after'
							: 'before',
				});
			}
		},
		[allTasks, kanbans, reorderKanban, reorderTask]
	);
};

export const ColumnContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	flex: 1;
`;
