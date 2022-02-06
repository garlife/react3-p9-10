import React, { PureComponent, useState, useEffect } from 'react';
import View from "./View"


const columnsFromBackend = {
  open: {
    name: 'Open',
    items: [],
  },
  close: {
    name: 'Close',
    items: [],
  },
};



export default function App() {
 

  return (
    <>
    <View columnsFromBackend={columnsFromBackend} />

    </>
  )
}
