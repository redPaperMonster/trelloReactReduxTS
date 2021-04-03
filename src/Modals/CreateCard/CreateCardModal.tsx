
import React from 'react'
import { Modal, Button, FieldInput } from '../../Components';
import { CreateCardItemWrapper, CreateCardWrapper, ModalTitle } from './CreateCardStyle';
import { Values } from '../CreateColumn/CreateColumnModal';
import { Field, Form } from 'react-final-form';
import { cardActions } from '../../Store';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { CardType, fieldRequired } from '../../Utils';

interface ModalProps {
  isOpen: boolean,
  close: () => void,
  columnId: string
}

const ModalCreateCard: React.FC<ModalProps> = ({
  isOpen,
  close,
  columnId }) => {

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
                  validate={fieldRequired}
                  component={FieldInput} />
              </CreateCardItemWrapper>
              <ModalTitle>Enter card description</ModalTitle>
              <CreateCardItemWrapper>
                <Field
                  name="description"
                  component={FieldInput} />
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