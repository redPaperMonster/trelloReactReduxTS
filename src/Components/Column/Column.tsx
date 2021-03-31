import Card from '../Card/Card';
import React, { useState } from 'react'
import { ColumnInputWrapper, ColumnInfoWrapper, ColumnWrapper, ColumnButtonWrapper, ColumnFormWrapper } from './columnStyles';
import { ModalCreateCard } from '../../Modals';
import { Button, FormTextarea } from '..';
import { Field, Form } from 'react-final-form';
import { CardType, ColumnType, columnActions, stateSelectors, RootState, cardActions } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
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
  const required = (value: string) => (value ? undefined : "title shouldn't be empty")

  const dispatch = useDispatch();

  const cards = useSelector(stateSelectors.getCards(column.id))

  const handleDelete = () => {
    dispatch(columnActions.deleteColumn(column.id))
    cards.length > 0 && dispatch(cardActions.deleteCardByColumnId(cards[0].id))
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
                      validate={required}
                      disabled={!isRedacted}
                      component={FormTextarea} />
                    <Field
                      name="description"
                      customSize={10}
                      disabled={!isRedacted}
                      component={FormTextarea} />
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