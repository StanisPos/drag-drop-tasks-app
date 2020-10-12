import * as React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";

const StyledRow = styled(Row)`
  border: 1px solid lightblue;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({isDragging}) =>
    isDragging ? "lightyellow" : "lightgreen"};
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: orange;
  border-radius: 5px;
`;

export const Task = React.memo(({task, index}) => (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
          <StyledRow
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              {...provided.draggableProps}
          >
            <Handle {...provided.dragHandleProps} />
            {task.content}
          </StyledRow>
      )}
    </Draggable>
));
