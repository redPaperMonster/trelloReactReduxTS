import * as React from 'react';
import { useState } from 'react'
import { CardType, CommentsType } from '../../App'
import { CardWrapper, CardTitle, CardItem, CardButtonWpapper } from './cardsStyles';
import { ModalCardInfo } from '../../Modals';
import { Button } from '..';

interface CardProps {
  card: CardType,
  comments: Array<CommentsType>,
  columnTitle: string,
  userName: string,
  handleDeleteCard: (id: string) => void,
  handleUpdateCard: (updatedCard: CardType) => void,
  handleAddComment: (cardId: string, text: string) => void,
  handleDeleteComment: (id: string) => void,
  handleUpdateComment: (updatedComment: CommentsType) => void
}

const Card: React.FC<CardProps> = ({
  card,
  comments,
  handleDeleteCard,
  handleUpdateCard,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
  columnTitle,
  userName }) => {

  const [showCardInfo, setShowCardInfo] = useState(false)

  return (
    <CardItem onClick={() => setShowCardInfo(true)}>
      <CardWrapper>
        <CardTitle>{card.title}</CardTitle>
        <CardTitle>✉ {comments.length}</CardTitle>
        <CardButtonWpapper>
          <Button
            onClick={() => handleDeleteCard(card.id)}
            text="x" /></CardButtonWpapper>
      </CardWrapper>
      <ModalCardInfo
        isOpen={showCardInfo}
        close={() => setShowCardInfo(false)}
        card={card}
        columnTitle={columnTitle}
        userName={userName}
        handleUpdateCard={handleUpdateCard}
        comments={comments}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        handleUpdateComment={handleUpdateComment} />
    </CardItem>
  )
}

export default Card;