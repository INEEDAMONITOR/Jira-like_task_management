import styled from '@emotion/styled';
import { Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';
import * as React from 'react';

export const Row = styled.div<{
	gap?: number | boolean;
	between?: boolean;
	marginBottom?: number;
}>`
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.between ? 'space-between' : undefined};
	margin-bottom: ${(props) => props.marginBottom + 'rem'};
	> * {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		margin-right: ${(props) => {
			const gap = props.gap;
			if (typeof props.gap === 'number') {
				return props.gap + 'rem';
			} else if (props.gap) {
				return '2rem';
			} else {
				return undefined;
			}
		}};
	}
`;

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const FullPageLoading = () => {
	return (
		<FullPage>
			<Spin size={'large'} />
		</FullPage>
	);
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
	<FullPage>
		<DevTools />
		<Typography.Text type="danger">{error?.message}</Typography.Text>
	</FullPage>
);
