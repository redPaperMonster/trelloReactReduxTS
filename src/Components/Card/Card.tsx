import React, { useState } from 'react'
import { CardWrapper, CardTitle, CardItem, CardButtonWrapper } from './cardsStyles';
import { ModalCardInfo } from '../../Modals';
import { Button } from '..';
import { cardActions, CardType, stateSelectors } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';

interface CardProps {
  card: CardType
}

const Card: React.FC<CardProps> = ({
  card }) => {

  const [showCardInfo, setShowCardInfo] = useState(false)
  const dispatch = useDispatch();

  const comments = useSelector(stateSelectors.getComms(card.id));

  return (
    <CardItem onClick={() => setShowCardInfo(true)}>
      <CardWrapper>
        <CardTitle>{card.title}</CardTitle>
        <CardTitle>✉ {comments.length}</CardTitle>
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