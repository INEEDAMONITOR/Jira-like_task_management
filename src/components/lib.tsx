import styled from '@emotion/styled';
import { Button, Spin, Typography } from 'antd';
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
		<ErrorBox error={error} />
	</FullPage>
);

export const ButtonNoPadding = styled(Button)`
	padding: 0;
`;

export const ScreenContainerWithPadding = styled.div`
	padding: 3.2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
	if (isError(error)) {
		return (
			<Typography.Text type={'danger'}>{error?.message}</Typography.Text>
		);
	}
	return null;
};
