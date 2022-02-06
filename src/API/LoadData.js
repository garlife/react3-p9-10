import React, { PureComponent, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const loadItem = (setColumns) => {
  fetch('https://api.github.com/repos/garlife/react3-p9-10/issues')
    .then((response) => response.json())
    .then((data) =>
      data.map((item) => ({
        id: `${item.number}`,
        content: item.title,
        data,
        state: item.state,
      }))
    )
    .then((data) => {
      const columns = {
        open: {
          name: 'Open',
          items: [],
        },
        close: {
          name: 'Close',
          items: [],
        },
      };
      for (let key of data
        .map((el) => el.state)
        .filter((value, index, array) => array.indexOf(value) === index)) {
        columns[key] = {
          name: key,
          items: data.filter((el) => el.state === key),
        };
      }

      // console.log(columns);
      return columns;
    })
    .then((data) => setColumns(data));
};

export default loadItem;