import * as React from 'react';
import { useTaskSearchParam } from './util';
import { useSetUrlSearchParam } from 'utils/url';
import { Row } from 'components/lib';
import { Button, Input } from 'antd';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';
import { useEffect, useState } from 'react';
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
	const [searchName, setSearchName] = useState('');
	useEffect(() => {
		const identifier = setTimeout(() => {
			setSearchParam({ name: searchName });
		}, 200);

		return () => {
			clearTimeout(identifier);
		};
	}, [searchName, setSearchParam]);
	return (
		<Row marginBottom={4} gap={true}>
			<Input
				style={{ width: '20rem' }}
				placeholder={'name'}
				value={searchName}
				onChange={(evt) => setSearchName(evt.target.value)}
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
