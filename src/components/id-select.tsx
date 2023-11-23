import { Select } from 'antd';
import { log } from 'console';
import * as React from 'react';
import { Raw } from 'types';

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
	value?: Raw | null | undefined;
	/**
	 *  When `isNaN(Number(value)) == true`
	 * @param {number | undefined} value - Only take `number | undefined`
	 * @returns
	 */
	onChange?: (value?: number) => void;
	defaultOptionName?: string;
	options?: { name: string; id: number }[];
}
/**
 * The type of input value `props.value` is `Raw | null | undefined`
 * `onChange` will only take `number | undefined` as props
 *
 * @param props
 */

export const IdSelect = (props: IdSelectProps) => {
	const { value, onChange, defaultOptionName, options, ...restProps } = props;
	return (
		<Select
			value={options?.length ? toNumber(value) : 0}
			onChange={(value) => onChange?.(toNumber(value) || undefined)}
			{...restProps}
		>
			{defaultOptionName ? (
				<Select.Option value={0}> {defaultOptionName}</Select.Option>
			) : null}
			{options?.map((option) => (
				<Select.Option value={option.id} key={option.id}>
					{option.name}
				</Select.Option>
			))}
		</Select>
	);
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
