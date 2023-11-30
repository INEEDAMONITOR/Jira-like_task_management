import { Typography } from 'antd';
import * as React from 'react';

export const MarkedKeyWordText = ({
	str,
	keyWord,
}: {
	str: string;
	keyWord?: string;
}) => {
	if (!keyWord) {
		return <>{str}</>;
	}
	const list = str.split(keyWord);
	return (
		<>
			{list.map((str, index) => {
				return (
					<span key={index}>
						<Typography.Text>{str}</Typography.Text>
						{index === list.length - 1 ? null : (
							<Typography.Text type="success">
								{keyWord}
							</Typography.Text>
						)}
					</span>
				);
			})}
		</>
	);
};
