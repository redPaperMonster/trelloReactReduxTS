import Card from '../Card/Card';
import React, { useState } from 'react'
import { ColumnInputWrapper, ColumnInfoWrapper, ColumnWrapper, ColumnButtonWrapper, ColumnFormWrapper } from './columnStyles';
import { ModalCreateCard } from '../../Modals';
import { Button, FieldInput } from '..';
import { Field, Form } from 'react-final-form';
import { columnActions, stateSelectors, cardActions } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import { CardType, ColumnType, fieldRequired } from '../../Utils';

interface ColumnProps {
  column: ColumnType
}
export interface Values {
  title: string,
  description: string
}

const Column: React.FC<ColumnProps> = ({
  column }) => {

  const [isRedacted, setRedacted] = useState<boolean>(false);
  const [showCreateCardModal, setCreateCardModal] = useState<boolean>(false)

  const dispatch = useDispatch();

  const cards = useSelector(stateSelectors.getCardsByColumnId(column.id))

  const handleDelete = () => {
    dispatch(columnActions.deleteColumn(column.id)) //cards[0].id
    if (cards.length > 0) {
      const cardIds = cards.map((i: CardType) => i.id)
      //console.log(`cardIds`, cardIds)
      dispatch(cardActions.deleteCardByColumnId({ columnId: column.id, cardsId: cardIds }))
    }
  }

  const saveChanges = (values: Values) => {
    setRedacted(false);
    let newColumn: ColumnType = { id: column.id, title: values.title, description: values.description }
    dispatch(columnActions.updateColumn(newColumn))
  }

  const updateAction = (values: Values) => {
    isRedacted ? saveChanges(values) : setRedacted(true)
  }

  return (
    <div >
      <ColumnWrapper>
        <ColumnInfoWrapper>
          <Form
            onSubmit={updateAction}
            initialValues={{ title: column.title, description: column.description }}>
            {({ handleSubmit }) => (
              <form >
                <ColumnFormWrapper>
                  <ColumnInputWrapper>
                    <Field
                      name="title"
                      customSize={10}
                      validate={fieldRequired}
                      disabled={!isRedacted}
                      component={FieldInput} />
                    <Field
                      name="description"
                      customSize={10}
                      disabled={!isRedacted}
                      component={FieldInput} />
                  </ColumnInputWrapper>

                  <ColumnButtonWrapper>
                    <Button
                      customStyles="margin-bottom: 6px;"
                      onClick={handleSubmit}
                      text={isRedacted ? "💾" : "✎"} />
                    <Button onClick={handleDelete}
                      text="🗑" />
                  </ColumnButtonWrapper>
                </ColumnFormWrapper>
              </form>
            )}
          </Form>

        </ColumnInfoWrapper>
        {
          cards.map((card: CardType) => {
            return <Card
              key={card.id}
              card={card} />
          })
        }
        <Button
          customStyles="margin: 5px 5px;"
          onClick={() => setCreateCardModal(true)}
          text="+ add card" />
        <ModalCreateCard
          isOpen={showCreateCardModal}
          columnId={column.id}
          close={() => setCreateCardModal(false)} />
      </ColumnWrapper></div>
  )
}

export default Column;