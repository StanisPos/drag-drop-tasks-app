import * as React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "./task";
import { Container } from "react-bootstrap";

const StyledContainer = styled(Container)`
  margin: 8px;
  border: 1px solid lightblue;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 200ms ease;
  background-color: ${({isDraggingOver}) =>
    isDraggingOver ? "skyblue" : "white"};
`;

export const Column = React.memo(({column, tasks}) => {
    return (
        <StyledContainer>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, i) => (
                            <Task key={task.id} task={task} index={i}/>
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </StyledContainer>
    );
});
