import React, { useState } from 'react'
import { CardWrapper, CardTitle, CardItem, CardButtonWrapper, CardTitleWrapper, CommentsCountWrapper } from './cardsStyles';
import { ModalCardInfo } from '../../Modals';
import { Button } from '..';
import { cardActions, stateSelectors } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import { CardType } from '../../Utils';

interface CardProps {
  card: CardType
}

const Card: React.FC<CardProps> = ({
  card }) => {

  const [showCardInfo, setShowCardInfo] = useState(false)
  const dispatch = useDispatch();

  const comments = useSelector(stateSelectors.getCommentsByCardId(card.id));

  return (
    <CardItem onClick={() => setShowCardInfo(true)}>
      <CardWrapper>
        <CardTitleWrapper>
          <CardTitle>{card.title}</CardTitle>
        </CardTitleWrapper>
        <CommentsCountWrapper>
          <CardTitle>✉ {comments.length}</CardTitle>
        </CommentsCountWrapper>
        <CardButtonWrapper>
          <Button
            onClick={() => dispatch(cardActions.deleteCard(card.id))}
            text="x" />
        </CardButtonWrapper>
      </CardWrapper>
      <ModalCardInfo
        isOpen={showCardInfo}
        close={() => setShowCardInfo(false)}
        card={card}
        comments={comments} />
    </CardItem>
  )
}

export default Card;