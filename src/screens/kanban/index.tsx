import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import {
	useKanbanSearchParam,
	useProjectInUrl,
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

export const KanbanScreen = () => {
	useDocumentTitle('Kanban');
	const { data: kanbans, isLoading: isKanbanLoading } = useKanbans(
		useKanbanSearchParam()
	);
	const { data: currentProject } = useProjectInUrl();
	const { isLoading: isTaskLoading } = useTasks(useTaskSearchParam());
	const isLoading = isTaskLoading || isKanbanLoading;
	return (
		<ScreenContainerWithPadding>
			<h1>{currentProject?.name} Kanban</h1>
			<SearchPanel />
			<ColumnContainer>
				{isLoading ? (
					<Spin size="large" />
				) : (
					kanbans?.map((kanban) => {
						return <KanbanColumn key={kanban.id} kanban={kanban} />;
					})
				)}
				<CreateKanban />
			</ColumnContainer>

			<TaskModal />
		</ScreenContainerWithPadding>
	);
};
export const ColumnContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	flex: 1;
`;
