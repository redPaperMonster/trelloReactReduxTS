
import React, { useState } from 'react'
import { CardType, CommentsType } from '../App';
import { Modal, Button, Input, CommentItem } from '../Components';
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

  const addComment = () => {
    handleAddComment(card.id, comment);
    setComment('');
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

  const redactFields = <CardRedactWrapper>
    <CardInputWrapper>
      <Input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)} />
    </CardInputWrapper>
    <CardInputWrapper>
      <Input
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)} />
    </CardInputWrapper>
  </CardRedactWrapper>

  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      {isRedacted ? redactFields : information}
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
        <CommentTextarea
          autoFocus
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}></CommentTextarea>
        <Button
          style="padding: 10px 5px; margin-left: 5px;"
          onClick={addComment}
          text="save comment" />
      </SendCommentWrapper>
    </Modal>
  )
}

export default ModalCardInfo;