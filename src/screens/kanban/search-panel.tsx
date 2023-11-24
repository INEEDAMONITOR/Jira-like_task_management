import * as React from 'react';
import { useTaskSearchParam } from './util';
import { useSetUrlSearchParam } from 'utils/url';
import { Row } from 'components/lib';
import { Button, Input } from 'antd';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';
function SearchPanel() {
	const searchParam = useTaskSearchParam();
	const setSearchParam = useSetUrlSearchParam();
	const reset = () => {
		setSearchParam({
			typeId: undefined,
			processorId: undefined,
			tagId: undefined,
			name: undefined,
		});
	};
	return (
		<Row marginBottom={4} gap={true}>
			<Input
				style={{ width: '20rem' }}
				placeholder={'name'}
				value={searchParam.name}
				onChange={(evt) => setSearchParam({ name: evt.target.value })}
			/>
			<UserSelect
				defaultOptionName="Agent"
				value={searchParam.processorId}
				onChange={(value) => setSearchParam({ processorId: value })}
			/>
			<TaskTypeSelect
				defaultOptionName={'type'}
				value={searchParam.typeId}
				onChange={(value) => setSearchParam({ typeId: value })}
			/>
			<Button onClick={reset} type="link">
				Reset search
			</Button>
		</Row>
	);
}

export default SearchPanel;
