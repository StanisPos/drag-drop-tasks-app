import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import 'normalize.css';
import './style.css';
import { initialData } from './initial-data';
import { Column } from './column';

const App = React.memo(() => {
	const [list, setList] = React.useState(initialData);

	const onStart = (evt) => {
		console.log(evt)
	}

	const onEnd = (result) => {
		const { destination, source, draggableId } = result;

		if(!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId &&
				destination.index === source.index
		) {
			return;
		}

		const column = list.columns[source.droppableId];
		console.log(column)
		const newListIds = column.taskIds.slice().splice(source.index, 1)
			.splice(destination.index, 0, draggableId)

		const newColumn = {
			...column,
			taskIds: newListIds
		}

		setList({[newColumn.id]: newColumn})
	}

	return (
		<DragDropContext onDragEnd={onEnd} onDragStart={onStart}>
			{list.columnOrder.map((columnId) => {
					const column = list.columns[columnId];
					const tasks = column.taskIds.map(taskId => list.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />
				})}
		</DragDropContext>
	)
});

ReactDOM.render(
  <React.StrictMode>
		<App />
  </React.StrictMode>,
  document.getElementById('root')
);
