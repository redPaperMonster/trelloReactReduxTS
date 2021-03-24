import Card from '../Card/Card';
import React, { ChangeEvent, useState } from 'react'
import { ColumnInputWrapper, ColumnInfoWrapper, ColumnWrapper, ColumnButtonWrapper } from './columnStyles';
import { ModalCreateCard } from '../../Modals';
import { Button, FormTextarea } from '..';
import { Field, Form } from 'react-final-form';
import { CardType, ColumnType, CommentType } from '../../Store/store';
interface ColumnProps {
  column: ColumnType,
  cards: Array<CardType>,
  comments: Array<CommentType>,
  userName: string,
  handleDeleteColumn: (id: string) => void,
  handleUpdate: (column: ColumnType) => void,
  handleDeleteCard: (id: string) => void,
  handleAddCard: (newCard: CardType) => void,
  handleUpdateCard: (updatedCard: CardType) => void,
  handleAddComment: (cardId: string, text: string) => void,
  handleDeleteComment: (id: string) => void,
  handleUpdateComment: (updatedComment: CommentType) => void
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

  const [isRedacted, setRedacted] = useState<boolean>(false);
  const [showCreateCardModal, setCreateCardModal] = useState<boolean>(false)
  const [updatedColumnTitle, setUpdatedColumnTitle] = useState<string>(column.title);
  const [updatedColumnDescription, setUpdatedColumnDescription] = useState<string>(column.description);

  const required = (value: string) => (value ? undefined : "title shouldn't be empty")

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
      setRedacted(false);
      let newColumn: ColumnType = { id: column.id, title: updatedColumnTitle, description: updatedColumnDescription }
      handleUpdate(newColumn);
    }
  }

  const updateAction = () => {
    isRedacted ? saveChanges() : setRedacted(true)
  }

  return (
    <div >
      <ColumnWrapper>
        <ColumnInfoWrapper>
          <Form
            onSubmit={updateAction}
            initialValues={{ title: updatedColumnTitle, description: updatedColumnDescription }}>
            {props => (
              <form >
                <ColumnInputWrapper>
                  <Field
                    name="title"
                    customSize={10}
                    validate={required}
                    disabled={!isRedacted}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUpdatedColumnTitle(e.currentTarget.value)}
                    component={FormTextarea} />
                  <Field
                    name="description"
                    customSize={10}
                    disabled={!isRedacted}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUpdatedColumnDescription(e.currentTarget.value)}
                    component={FormTextarea} />
                </ColumnInputWrapper>
                <ColumnButtonWrapper>
                  <Button
                    customStyles="margin-bottom: 6px;"
                    onClick={props.handleSubmit}
                    text={isRedacted ? "💾" : "✎"} />
                  <Button onClick={() => handleDeleteColumn(column.id)}
                    text="🗑" />
                </ColumnButtonWrapper>
              </form>
            )}
          </Form>

        </ColumnInfoWrapper>
        {
          cards.map((card: CardType) => {
            const commsForCard = comments.filter((i: CommentType) => i.cardId === card.id);
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