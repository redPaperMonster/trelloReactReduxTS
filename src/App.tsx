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
  deleteColumn,
  ColumnType,
  updateCard,
  addCard,
  deleteCard,
  selectCards,
  CardType,
  updateComment,
  addComment,
  deleteComment,
  selectComments,
  CommentType
} from './Store';



function App() {

  const [showCreateColumnModal, setCreateColumnModal] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const dispatch = useDispatch();
  const columns: Array<ColumnType> = useSelector(selectColumns);
  const cards: Array<CardType> = useSelector(selectCards);
  const comments: Array<CommentType> = useSelector(selectComments);

  useEffect(() => {
    checkUserName();
  }, [])

  const checkUserName = async () => {
    const storagedName = await localStorage.getItem("userName")
    storagedName && setUserName(storagedName)
    setLoading(false)
  }

  const handleSaveUsername = (newUserName: string) => {
    localStorage.setItem('userName', newUserName);
    setUserName(newUserName);
  }

  const handleAddColumn = (column: ColumnType) => {
    dispatch(addColumn(column));
  }

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumn(id));
  }

  const handleUpdateColumn = (column: ColumnType) => {
    dispatch(updateColumn(column));
  }

  const handleAddCard = (card: CardType) => {
    dispatch(addCard(card));
  }

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCard(id));
  }

  const handleUpdateCard = (card: CardType) => {
    dispatch(updateCard(card));
  }

  const handleAddComment = (CardId: string, text: string) => {
    const comment: CommentType = { id: `${new Date().getTime()}`, cardId: CardId, text: text, author: userName }
    dispatch(addComment(comment));
  }

  const handleDeleteComment = (id: string) => {
    dispatch(deleteComment(id));
  }

  const handleUpdateComment = (comment: CommentType) => {
    dispatch(updateComment(comment));
  }

  if (loading) return <h1>LOADING...</h1>;
  return (
    <div>
      <Header
        userName={userName}
        onClick={() => setCreateColumnModal(true)}
        text="+ create column" />

      <Board>
        <ModalRegistration
          isOpen={!userName}
          handleNameEnterSubmit={handleSaveUsername} />

        {columns.map((item: ColumnType) => {
          const columnCards =
            cards.filter((i: CardType) => i.columnId === item.id);
          return (
            <Column
              handleUpdate={handleUpdateColumn}
              key={item.id}
              column={item}
              userName={userName}
              cards={columnCards}
              comments={comments}
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
