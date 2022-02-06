import React, { PureComponent, useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_TOKEN = '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';

const UpdateIssue = (issue_number, state) => {
  fetch(
    `https://api.github.com/repos/garlife/react3-p9-10/issues/${issue_number}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('garlife' + ':' + API_TOKEN.toString())}`,
      },
      body: JSON.stringify({
        owner: 'garlife',
        repo: 'react3-p9-10',
        issue_number: issue_number,
        state: state,
      }),
    }
  );
};

export default UpdateIssue;