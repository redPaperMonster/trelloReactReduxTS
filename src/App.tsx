import React from 'react';
import { useState, useEffect } from 'react'
import { Column, Header } from './Components/';
import { ModalRegistration, ModalCreateColumn } from './Modals';
import { Board } from "./AppStyles";
import { useSelector, useDispatch } from 'react-redux';
import {
  updateColumn,
  selectColumns,
  addColumn,
  deleteColumn
} from './Store/columnSlice';


export type ColumnType = {
  id: string,
  title: string,
  description: string
}

export type CardType = {
  id: string,
  columnId: string,
  title: string,
  description: string
}

export type CommentsType = {
  id: string,
  cardId: string,
  text: string,
  author: string
}

export type DataStoreType = {
  //columns: Array<ColumnType>
  cards: Array<CardType>
  comments: Array<CommentsType>
}

function App() {
  const initialStore: DataStoreType = {

    cards: [{ id: "123", columnId: "1234-TODO", title: "some", description: "dsdf" }],

    comments: []
  }

  const [dataStore, setDataStore] = useState<DataStoreType>(initialStore);
  const [showCreateColumnModal, setCreateColumnModal] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const dispatch = useDispatch();
  const columns: Array<ColumnType> = useSelector(selectColumns);

  useEffect(() => {
    checkUserName();
  }, [])

  const checkUserName = async () => {
    const storagedName = await localStorage.getItem("userName")
    storagedName && setUserName(storagedName)
    setLoading(false)
  }

  const deleteUserName = () => {
    localStorage.setItem('userName', '');
    setUserName("");
  }

  const handleAddColumn = (column: ColumnType) => {
    //console.log(`column`, column)
    dispatch(addColumn(column));
    //setDataStore({ ...dataStore, columns: [...dataStore.columns, newColumn] })
  }

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumn(id));
    // const newColumns = dataStore.columns.filter(
    //   (item: ColumnType) => item.id !== id);
    // const newCards = dataStore.cards.filter(
    //   (item: CardType) => item.columnId !== id);
    // const newCardsIds = newCards.map(
    //   (i: CardType) => { return i.id })
    // const newComments = dataStore.comments.filter(
    //   (i: CommentsType) => {
    //     return newCardsIds.includes(i.cardId)
    //   })
    // setDataStore({ ...dataStore, columns: newColumns, cards: newCards, comments: newComments })
  }

  const handleUpdateColumn = (column: ColumnType) => {
    dispatch(updateColumn(column));

  }

  const handleAddCard = (newCard: CardType) => {
    setDataStore({ ...dataStore, cards: [...dataStore.cards, newCard] })
  }

  const handleDeleteCard = (id: string) => {
    let newCards = dataStore.cards.filter(
      (item: CardType) => item.id !== id)
    let newComments = dataStore.comments.filter(
      (item: CommentsType) => item.cardId !== id)
    setDataStore({ ...dataStore, cards: newCards, comments: newComments })
  }

  const handleUpdateCard = (newCard: CardType) => {
    let updatedCards = dataStore.cards.map((item: CardType) => {
      if (newCard.id === item.id) {
        return newCard
      }
      return item
    })
    setDataStore({ ...dataStore, cards: updatedCards })
  }

  const handleSaveUsername = (newUserName: string) => {
    if (!!newUserName) {
      localStorage.setItem('userName', newUserName);
      setUserName(newUserName);
    }
  }

  const handleAddComment = (CardId: string, text: string) => {
    if (!!text) {
      const newComment = { id: `${new Date().getTime()}`, cardId: CardId, text: text, author: userName }
      setDataStore({ ...dataStore, comments: [...dataStore.comments, newComment] })
    }
  }

  const handleDeleteComment = (id: string) => {
    let newComments = dataStore.comments.filter((i) => i.id !== id)
    setDataStore({ ...dataStore, comments: newComments })
  }

  const handleUpdateComment = (updatedComment: CommentsType) => {
    let updatedComments = dataStore.comments.map((item: CommentsType) => {
      if (updatedComment.id === item.id) {
        return item = updatedComment
      }
      return item
    })
    setDataStore({ ...dataStore, comments: updatedComments })
  }

  if (loading) return <h1>LOADING...</h1>;
  return (
    <div>
      <Header
        deleteName={deleteUserName}
        userName={userName}
        onClick={() => setCreateColumnModal(true)}
        text="+ create column" />

      <Board>
        <ModalRegistration
          isOpen={!userName}
          handleNameEnterSubmit={handleSaveUsername} />

        {columns.map((item: ColumnType) => {
          const columnCards =
            dataStore.cards.filter((i: CardType) => i.columnId === item.id);
          return (
            <Column
              handleUpdate={handleUpdateColumn}
              key={item.id}
              column={item}
              userName={userName}
              cards={columnCards} comments={dataStore.comments}
              handleDeleteColumn={handleDeleteColumn}
              handleDeleteCard={handleDeleteCard}
              handleAddCard={handleAddCard}
              handleUpdateCard={handleUpdateCard}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment} />)
        })}
        <ModalCreateColumn
          isOpen={showCreateColumnModal}
          close={() => setCreateColumnModal(false)}
          handleAddColumn={handleAddColumn} />
      </Board>
    </div >

  )
}

export default App;
