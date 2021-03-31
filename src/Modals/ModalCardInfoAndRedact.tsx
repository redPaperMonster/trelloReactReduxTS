
import React, { useState } from 'react'
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, FormTextarea, CommentItem, FormInput } from '../Components';
import { cardActions, CardType, commentActions, CommentType, stateSelectors } from '../Store';
import { CardModalDescr, CardRedactWrapper, CommentsWrapper, SendCommentWrapper } from './ModalsStyles';
import { nanoid } from '@reduxjs/toolkit';

interface ModalProps {
  isOpen: boolean,
  close: () => void,
  card: CardType,
  comments: Array<CommentType>
}

interface Values {
  text: string
}
interface CardValues {
  title: string,
  description: string
}
const ModalCardInfo: React.FC<ModalProps> = ({
  isOpen,
  close,
  card,
  comments }) => {

  const [isRedacted, setIsRedacted] = useState<boolean>(false)

  const required = (value: string) => (value ? undefined : "title shouldn't be empty")
  const commentRequired = (value: string) => (value ? undefined : "enter comments text")
  const dispatch = useDispatch();

  const userName = useSelector(stateSelectors.getUserName());

  const columnTitle = useSelector(stateSelectors.getColumnTitle(card.columnId));

  const addComment = (values: Values) => {
    const newComment = {
      id: nanoid(),
      cardId: card.id, text: values.text,
      author: userName
    };
    dispatch(commentActions.addComment(newComment))
  }

  const saveChanges = (values: CardValues) => {
    setIsRedacted(false);
    const newCard = {
      id: card.id, columnId: card.columnId, title: values.title, description: values.description
    }
    dispatch(cardActions.updateCard(newCard))
  }

  const updateAction = (values: CardValues) => {
    isRedacted ? saveChanges(values) : setIsRedacted(true)
  }


  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <CardRedactWrapper>
        <Form
          onSubmit={updateAction}
          initialValues={{ title: card.title, description: card.description }}>
          {({ handleSubmit }) => (
            <form >
              <label>card title</label>
              <Field
                name="title"
                customSize={10}
                disabled={!isRedacted}
                customStyle="&:disabled {background-color: white;}; "
                validate={required}
                component={FormTextarea} />

              <label>card description</label>
              <Field
                name="description"
                disabled={!isRedacted}
                customStyle="&:disabled {background-color: white;}; "
                customSize={10}
                component={FormTextarea} />
              <Button
                onClick={handleSubmit}
                text={isRedacted ? "💾" : "✎"} />
            </form>
          )}
        </Form>
      </CardRedactWrapper >

      <CardModalDescr>Column: {columnTitle}, Author: {userName}</CardModalDescr>
      <CommentsWrapper>
        {comments.map((i: CommentType) => {
          return <CommentItem
            comment={i}
            key={i.id} />
        })}
      </CommentsWrapper>
      <SendCommentWrapper>
        <Form
          onSubmit={addComment}
          render={({ handleSubmit, form }) => (
            <form>
              <Field

                name="text"
                validate={commentRequired}
                component={FormInput} />
              <Button
                customStyles="padding: 10px 5px; margin-left: 5px;"
                onClick={() => {
                  handleSubmit();
                  form.restart();
                }}
                text="save comment" />
            </form>
          )} />
      </SendCommentWrapper>
    </Modal>
  )
}

export default ModalCardInfo;