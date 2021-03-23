
import React from 'react'
import { Field, Form } from 'react-final-form';
import { ColumnType } from '../App'
import { Modal, Button, FormInput } from '../Components'
import { ModalTitle } from './ModalsStyles';
import { CreateColumnItemWrapper, CreateColumnWrapper } from './ModalsStyles'
interface ModalProps {
    isOpen: boolean,
    close: () => void,
    handleAddColumn: (column: ColumnType) => void
}
export interface Values {
    title: string,
    description: string
}
const required = (value: string) => (value ? undefined : "title shouldn't be empty")

const ModalCreateColumn: React.FC<ModalProps> = ({
    isOpen,
    close,
    handleAddColumn }) => {

    let newColumnName: string, newColumnDescription: string

    const handleSubmit = (values: Values) => {
        let newColumn: ColumnType = {
            id: `${new Date().getTime()}-${newColumnName}`,
            title: values.title, description: values.description
        };
        handleAddColumn(newColumn);
        close();
    }

    return (
        <div>
            <Modal isOpen={isOpen} close={close}>
                <Form onSubmit={handleSubmit}>
                    {props => (
                        <form>
                            <CreateColumnWrapper>
                                <ModalTitle>Enter column title</ModalTitle>
                                <div>
                                    <Field
                                        focused
                                        name="title"
                                        validate={required}
                                        component={FormInput} />
                                </div>
                                <ModalTitle>Enter column description</ModalTitle>
                                <CreateColumnItemWrapper>
                                    <Field
                                        name="description"
                                        component={FormInput} />
                                </CreateColumnItemWrapper>
                                <CreateColumnItemWrapper>
                                    <Button
                                        customStyles="padding: 5px 20px"
                                        onClick={props.handleSubmit}
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