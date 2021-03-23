
import React, { ChangeEvent, useState } from 'react'
import { Field, Form } from 'react-final-form';
import { CardType, CommentsType } from '../App';
import { Modal, Button, FormTextarea, CommentItem, FormInput } from '../Components';
import { CardDescr, CardInfoWrapper, CardInputWrapper, CardModalDescr, CardRedactWrapper, CardTitle, CommentsWrapper, CommentTextarea, SendCommentWrapper } from './ModalsStyles';

interface ModalProps {
  isOpen: boolean,
  columnTitle: string,
  close: () => void,
  card: CardType,
  comments: Array<CommentsType>,
  userName: string,
  handleUpdateCard: (updatedCard: CardType) => void,
  handleAddComment: (cardId: string, text: string) => void,
  handleDeleteComment: (id: string) => void,
  handleUpdateComment: (updatedComment: CommentsType) => void
}

interface Values {
  text: string
}
const ModalCardInfo: React.FC<ModalProps> = ({
  isOpen,
  close,
  card,
  handleUpdateCard,
  comments,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
  columnTitle,
  userName }) => {

  const [isRedacted, setIsRedacted] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(card.title);
  const [description, setDescription] = useState<string>(card.description);
  const [comment, setComment] = useState<string>('')

  const required = (value: string) => (value ? undefined : "title shouldn't be empty")
  const commentRequired = (value: string) => (value ? undefined : "enter comments text")

  const addComment = (values: Values) => {
    handleAddComment(card.id, values.text);
    setComment(' ');
  }

  const saveChanges = () => {
    if (!!title) {
      setIsRedacted(false);
      handleUpdateCard({ id: card.id, columnId: card.columnId, title: title, description: description });
    }
  }

  const updateAction = () => {
    isRedacted ? saveChanges() : setIsRedacted(true)
  }
  const information = <CardInfoWrapper>
    <CardTitle>Card Name: {card.title}</CardTitle>
    <CardDescr>Card description: {card.description}</CardDescr>
  </CardInfoWrapper>

  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <CardRedactWrapper>
        <Form
          onSubmit={() => { }}
          initialValues={{ title: title, description: description }}>
          {props => (
            <form >
              <label>card title</label>
              <Field
                name="title"
                customSize={10}
                disabled={!isRedacted}
                customStyle="&:disabled {background-color: white;}; "
                validate={required}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                component={FormTextarea} />
              <label>card description</label>
              <Field
                name="description"
                disabled={!isRedacted}
                customStyle="&:disabled {background-color: white;}; "
                customSize={10}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)}
                component={FormTextarea} />
            </form>
          )}
        </Form>
      </CardRedactWrapper >
      <Button
        onClick={updateAction}
        text={isRedacted ? "💾" : "✎"} />
      <CardModalDescr>Column: {columnTitle}, Author: {userName}</CardModalDescr>
      <CommentsWrapper>
        {comments.map((i: CommentsType) => {
          return <CommentItem
            comment={i}
            key={i.id}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment} />
        })}
      </CommentsWrapper>
      <SendCommentWrapper>
        <Form
          onSubmit={addComment}
          initialValues={{ text: comment }}>
          {props => (
            <form>
              <Field
                value={comment}
                name="text"
                validate={commentRequired}
                component={FormInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.currentTarget.value)} />
              <Button
                customStyles="padding: 10px 5px; margin-left: 5px;"
                onClick={props.handleSubmit}
                text="save comment" />
            </form>
          )}
        </Form>
      </SendCommentWrapper>
    </Modal>
  )
}

export default ModalCardInfo;