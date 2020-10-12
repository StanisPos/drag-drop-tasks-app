import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initialData } from "./initial-data";
import { Column } from "./column";

const App = React.memo(() => {
  const [list, setList] = React.useState(initialData);

  const onStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color";
  };

  const onDragUpdate = ({destination}) => {
    const opacity = destination
        ? destination.index / Object.keys(list).length
        : 0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }
    const column = list.columns[source.droppableId];
    console.log(column);
    const newListIds = column.taskIds.slice();

    newListIds.splice(source.index, 1);
    newListIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newListIds,
    };

    setList({
      ...list,
      columns: {
        [newColumn.id]: newColumn,
      },
    });
  };

  return (
      <DragDropContext
          onDragEnd={onEnd}
          onDragUpdate={onDragUpdate}
          onDragStart={onStart}
      >
        {list.columnOrder.map((columnId) => {
          const column = list.columns[columnId];
          const tasks = column.taskIds.map((taskId) => list.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks}/>;
        })}
      </DragDropContext>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
    document.getElementById("root")
);
