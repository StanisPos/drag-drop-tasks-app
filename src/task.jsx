import * as React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
`

export const Task = React.memo(({ task, index }) => (
	<Draggable draggableId={task.id} index={index}>
		{(provided) => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{task.content}
				</Container>
			)
		}
	</Draggable>
))
