
import React from 'react'
import { ModalTitle } from './ModalsStyles';
import { Modal, Button, Input } from '../Components';
import { CreateCardItemWrapper, CreateCardWrapper } from './ModalsStyles';

interface ModalProps {
  isOpen: boolean,
  close: () => void,
  handleSubmitCreate: (title: string, description: string) => void
}

const ModalCreateCard: React.FC<ModalProps> = ({
  isOpen,
  close,
  handleSubmitCreate }) => {


  let title: string, description: string;

  const createAction = () => {
    handleSubmitCreate(title, description)
  }
  return (
    <Modal
      isOpen={isOpen}
      close={close}>
      <CreateCardWrapper>
        <ModalTitle>Enter card title</ModalTitle>
        <CreateCardItemWrapper>
          <Input focused
            onChange={e => { title = e.currentTarget.value }} />
        </CreateCardItemWrapper>
        <ModalTitle>Enter card description</ModalTitle>
        <CreateCardItemWrapper>
          <Input
            onChange={e => { description = e.currentTarget.value }} />
        </CreateCardItemWrapper>
        <CreateCardItemWrapper>
          <Button
            style="padding: 5px 20px"
            onClick={createAction}
            text="ok" />
        </CreateCardItemWrapper>
      </CreateCardWrapper>
    </Modal>
  )
}

export default ModalCreateCard;