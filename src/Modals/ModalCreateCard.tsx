
import React from 'react'
import { ModalTitle } from './ModalsStyles';
import { Modal, Button, Input, FormInput } from '../Components';
import { CreateCardItemWrapper, CreateCardWrapper } from './ModalsStyles';
import { Values } from './ModalCreateColumn';
import { Field, Form } from 'react-final-form';

interface ModalProps {
  isOpen: boolean,
  close: () => void,
  handleSubmitCreate: (title: string, description: string) => void
}

const ModalCreateCard: React.FC<ModalProps> = ({
  isOpen,
  close,
  handleSubmitCreate }) => {

  const required = (value: string) => (value ? undefined : "title shouldn't be empty")

  const handleSubmit = (values: Values) => {
    handleSubmitCreate(values.title, values.description)
  }
  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <Form onSubmit={handleSubmit}>
        {props => (
          <form>
            <CreateCardWrapper>
              <ModalTitle>Enter card title</ModalTitle>
              <CreateCardItemWrapper>
                <Field
                  focused
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
                  onClick={props.handleSubmit}
                  text="ok" />
              </CreateCardItemWrapper>
            </CreateCardWrapper>
          </form>)}
      </Form>
    </Modal>
  )
}

export default ModalCreateCard;