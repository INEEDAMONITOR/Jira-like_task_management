import React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useKanbanSearchParam, useProjectInUrl } from './util';
import { KanbanColumn } from './kanban-column';
import styled from '@emotion/styled';
import { useHttp } from 'utils/http';
import SearchPanel from './search-panel';
import { ScreenContainerWithPadding } from 'components/lib';

export const KanbanScreen = () => {
	useDocumentTitle('Kanban');
	const { data: kanbans } = useKanbans(useKanbanSearchParam());
	const { data: currentProject } = useProjectInUrl();
	return (
		<ScreenContainerWithPadding>
			<h1>{currentProject?.name} Kanban</h1>
			<SearchPanel />
			<ColumnContainer>
				{kanbans?.map((kanban) => {
					return <KanbanColumn key={kanban.id} kanban={kanban} />;
				})}
			</ColumnContainer>
		</ScreenContainerWithPadding>
	);
};
const ColumnContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	flex: 1;
`;
