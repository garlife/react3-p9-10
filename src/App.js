import React, { PureComponent, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const loadItem = (setColumns) => {
  fetch("https://api.github.com/repos/garlife/react3-p9-10/issues")
    .then(response => response.json())
    .then(data => data.map(item => ({ id: `${item.number}`, content: item.title, data, state: item.state })))
    .then(data => {      
      const columns = {
        open: {
          name: "Open",
          items: []
        },
        close: {
          name: "Close",
          items: []
        }
      };
      for (let key of data.map( el => el.state).filter((value, index, array) => (array.indexOf(value) === index))) {
        columns[key] = {name: key, items: data.filter(el => el.state === key)}           
      }

      // console.log(columns);
      return columns;
    })
    .then(data => setColumns(data));
};

const columnsFromBackend = {
  open: {
    name: "Open",
    items: []
  },
  close: {
    name: "Close",
    items: []
  }
};

const API_TOKEN = "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";

const updateItem = (issue_number, state) => {
  fetch(`https://api.github.com/repos/{owner}/{repo}/issues/${issue_number}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${btoa('garlife' + ':' + API_TOKEN)}`
    },
    body: JSON.stringify({
      "owner": "garlife",
      "repo": 'react3-p9-10',
      "issue_number": issue_number,
      "state": state
    })
});

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

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
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
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
        items: copiedItems
      }
    });
  }
};

export default function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => { loadItem(setColumns)}, []);
  
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
}