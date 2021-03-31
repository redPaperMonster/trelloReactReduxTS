
import React from 'react'
import { Modal, Button, FormInput } from '../Components';
import { CreateCardItemWrapper, CreateCardWrapper, ModalTitle } from './ModalsStyles';
import { Values } from './ModalCreateColumn';
import { Field, Form } from 'react-final-form';
import { CardType, cardActions } from '../Store';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

interface ModalProps {
  isOpen: boolean,
  close: () => void,
  columnId: string
}

const ModalCreateCard: React.FC<ModalProps> = ({
  isOpen,
  close,
  columnId }) => {

  const required = (value: string) => (value ? undefined : "title shouldn't be empty")
  const dispatch = useDispatch();

  const handleSubmit = (values: Values) => {
    let newCard: CardType = {
      id: nanoid(), columnId: columnId,
      title: values.title, description: values.description
    };
    dispatch(cardActions.addCard(newCard));
    close();
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form>
            <CreateCardWrapper>
              <ModalTitle>Enter card title</ModalTitle>
              <CreateCardItemWrapper>
                <Field

                  name="title"
                  validate={required}
                  component={FormInput} />
              </CreateCardItemWrapper>
              <ModalTitle>Enter card description</ModalTitle>
              <CreateCardItemWrapper>
                <Field
                  name="description"
                  component={FormInput} />
              </CreateCardItemWrapper>
              <CreateCardItemWrapper>
                <Button
                  customStyles="padding: 5px 20px"
                  onClick={handleSubmit}
                  text="ok" />
              </CreateCardItemWrapper>
            </CreateCardWrapper>
          </form>)}
      </Form>
    </Modal>
  )
}

export default ModalCreateCard;