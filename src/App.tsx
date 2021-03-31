import React from 'react';
import { useState } from 'react'
import { Column, Header } from './Components/';
import { ModalRegistration, ModalCreateColumn } from './Modals';
import { Board } from "./AppStyles";
import { useSelector } from 'react-redux';
import {
  ColumnType,
  stateSelectors
} from './Store';

function App() {

  const [showCreateColumnModal, setCreateColumnModal] = useState<boolean>(false)

  const userName = useSelector(stateSelectors.getUserName());

  const columns: Array<ColumnType> = useSelector(stateSelectors.getCols());

  return (
    <div>
      <Header
        userName={userName}
        onClick={() => setCreateColumnModal(true)} />

      <Board>
        <ModalRegistration
          isOpen={!userName} />

        {columns.map((item: ColumnType) => {
          return (
            <Column
              key={item.id}
              column={item} />)
        })}
        <ModalCreateColumn
          isOpen={showCreateColumnModal}
          close={() => setCreateColumnModal(false)} />
      </Board>
    </div >

  )
}

export default App;
