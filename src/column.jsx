import * as React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from './task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightblue;
	border-radius: 2px;
`;

const Title = styled.h3`
	padding: 8px;
`;

const TaskList= styled.div`
	padding: 8px;
`

export const Column = React.memo(({ column, tasks }) => {
	return (
		<Container>
			<Title>{column.title}</Title>
			<Droppable droppableId={column.id}>
				{(provided) => (
						<TaskList
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{tasks.map((task, i) => <Task key={task.id} task={task} index={i}/>)}
							{provided.placeholder}
						</TaskList>
					)
				}
			</Droppable>
		</Container>
	);
})
