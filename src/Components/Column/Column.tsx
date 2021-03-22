import Card from '../Card/Card';
import React, { useEffect, useState } from 'react'
import { CardType, ColumnType, CommentsType } from '../../App'
import { TitleWrapper, TextDescr, Title, ColumnInfoWrapper, ColumnWrapper, ColumnButtonWrapper } from './columnStyles';
import { ModalCreateCard } from '../../Modals';
import { Button, Input } from '..';


interface ColumnProps {
  column: ColumnType,
  cards: Array<CardType>,
  comments: Array<CommentsType>,
  userName: string,
  handleDeleteColumn: (id: string) => void,
  handleUpdate: (column: ColumnType) => void,
  handleDeleteCard: (id: string) => void,
  handleAddCard: (newCard: CardType) => void,
  handleUpdateCard: (updatedCard: CardType) => void,
  handleAddComment: (cardId: string, text: string) => void,
  handleDeleteComment: (id: string) => void,
  handleUpdateComment: (updatedComment: CommentsType) => void
}


const Column: React.FC<ColumnProps> = ({
  column,
  cards,
  comments,
  userName,
  handleDeleteColumn,
  handleUpdate,
  handleDeleteCard,
  handleAddCard,
  handleUpdateCard,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment }) => {

  const [redactedMode, setRedactedMode] = useState<boolean>(false);
  const [showCreateCardModal, setCreateCardModal] = useState<boolean>(false)
  const [updatedColumnTitle, setUpdatedColumnTitle] = useState<string>(column.title);
  const [updatedColumnDescription, setUpdatedColumnDescription] = useState<string>(column.description);

  const handleSubmitCreate = (title: string, description: string) => {
    if (!!title) {
      let newCard: CardType = {
        id: `${new Date().getTime()}-${title}`, columnId: column.id,
        title: title, description: description
      };
      handleAddCard(newCard);
      setCreateCardModal(false);
    }
  }

  const saveChanges = () => {
    if (!!updatedColumnTitle) {
      setRedactedMode(false);
      let newColumn: ColumnType = { id: column.id, title: updatedColumnTitle, description: updatedColumnDescription }
      handleUpdate(newColumn);
    }
  }

  const updateAction = () => {
    redactedMode ? saveChanges() : setRedactedMode(true)
  }

  const columnDataShow = <TitleWrapper>
    <Title>{column.title}</Title>
    <TextDescr>{column.description}</TextDescr>
  </TitleWrapper>

  const columnDataRedact = <TitleWrapper>
    <Input
      value={updatedColumnTitle}
      onChange={(e) => setUpdatedColumnTitle(e.currentTarget.value)}
      customSize={10} />
    <Input
      value={updatedColumnDescription}
      onChange={(e) => setUpdatedColumnDescription(e.currentTarget.value)}
      customSize={10} />
  </TitleWrapper>



  return (
    <div >
      <ColumnWrapper>
        <ColumnInfoWrapper>
          {redactedMode ? columnDataRedact : columnDataShow}
          <ColumnButtonWrapper>
            <Button
              customStyles="margin-bottom: 6px;"
              onClick={updateAction}
              text={redactedMode ? "💾" : "✎"} />
            <Button onClick={() => handleDeleteColumn(column.id)}
              text="🗑" />
          </ColumnButtonWrapper>
        </ColumnInfoWrapper>
        {
          cards.map((card: CardType) => {
            const commsForCard = comments.filter((i: CommentsType) => i.cardId === card.id);
            return <Card
              key={card.id}
              card={card}
              columnTitle={column.title}
              userName={userName}
              comments={commsForCard}
              handleDeleteCard={handleDeleteCard}
              handleUpdateCard={handleUpdateCard}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment} />
          })
        }
        <Button
          customStyles="margin: 5px 5px;"
          onClick={() => setCreateCardModal(true)}
          text="+ add card" />
        <ModalCreateCard
          isOpen={showCreateCardModal}
          close={() => setCreateCardModal(false)}
          handleSubmitCreate={handleSubmitCreate} />
      </ColumnWrapper></div>
  )
}

export default Column;