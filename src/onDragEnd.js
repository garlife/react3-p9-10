import React, { PureComponent, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UpdateIssue from "./API/UpdateIssue"

const onDragEnd = (result, columns, setColumns) => {
  //console.log(result, columns)
  if (!result.destination) return;
  const { source, destination } = result;
  // console.log(result, columns, source, destination )
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
  //console.log( result.draggableId, destination.droppableId )
  UpdateIssue(result.draggableId, destination.droppableId);
  console.log(result.draggableId, destination.droppableId);
};

export default onDragEnd;