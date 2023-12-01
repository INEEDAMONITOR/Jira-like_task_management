import React, { ReactNode } from 'react';
import {
	Draggable,
	DraggableProps,
	DraggableProvided,
	Droppable,
	DroppableProps,
	DroppableProvided,
	DroppableProvidedProps,
} from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
	return (
		<Droppable {...props}>
			{(provided: DroppableProvided) => {
				if (React.isValidElement(children)) {
					return React.cloneElement(children as React.ReactElement, {
						...provided.droppableProps,
						ref: provided.innerRef,
						provided,
					});
				}
				return <div />;
			}}
		</Droppable>
	);
};

type DropChildProps = Partial<
	{ provided: DroppableProvided } & DroppableProvidedProps
> &
	React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
	({ children, ...props }, ref) => (
		<div ref={ref} {...props}>
			{children}
			{props.provided?.placeholder}
		</div>
	)
);

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
	return (
		<Draggable {...props}>
			{(provided: DraggableProvided) => {
				if (React.isValidElement(children)) {
					return React.cloneElement(children as React.ReactElement, {
						...provided.draggableProps,
						...provided.dragHandleProps,
						ref: provided.innerRef,
					});
				}
				return <div />;
			}}
		</Draggable>
	);
};
