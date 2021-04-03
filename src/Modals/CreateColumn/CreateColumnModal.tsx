
import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { Modal, Button, FieldInput } from '../../Components'
import { ColumnType, fieldRequired } from '../../Utils';
import { columnActions } from '../../Store';
import { ModalTitle, CreateColumnItemWrapper, CreateColumnWrapper } from './CreateColumnStyle'

interface ModalProps {
    isOpen: boolean,
    close: () => void
}
export interface Values {
    title: string,
    description: string
}


const ModalCreateColumn: React.FC<ModalProps> = ({
    isOpen,
    close }) => {

    const dispatch = useDispatch();

    const handleSubmit = (values: Values) => {
        let newColumn: ColumnType = {
            id: nanoid(),
            title: values.title, description: values.description
        };
        dispatch(columnActions.addColumn(newColumn));
        close();
    }

    return (
        <div>
            <Modal isOpen={isOpen} close={close}>
                <Form onSubmit={handleSubmit}>
                    {({ handleSubmit }) => (
                        <form>
                            <CreateColumnWrapper>
                                <ModalTitle>Enter column title</ModalTitle>
                                <div>
                                    <Field
                                        name="title"
                                        validate={fieldRequired}
                                        component={FieldInput} />
                                </div>
                                <ModalTitle>Enter column description</ModalTitle>
                                <CreateColumnItemWrapper>
                                    <Field
                                        name="description"
                                        component={FieldInput} />
                                </CreateColumnItemWrapper>
                                <CreateColumnItemWrapper>
                                    <Button
                                        customStyles="padding: 5px 20px"
                                        onClick={handleSubmit}
                                        text="ok" />
                                </CreateColumnItemWrapper>
                            </CreateColumnWrapper>
                        </form>)}
                </Form>
            </Modal>
        </div >
    )
}

export default ModalCreateColumn;