
import React, { useState } from 'react'
import { Button, Modal, FormInput } from '../Components';
import { Form, Field } from 'react-final-form'

interface ModalProps {
    isOpen: boolean,
    handleNameEnterSubmit: (name: string) => void
}

interface Values {
    userName: string
}

const ModalRegistration: React.FC<ModalProps> = ({
    isOpen,
    handleNameEnterSubmit }) => {

    const handleSubmit = (values: Values) => {
        handleNameEnterSubmit(values.userName)
    }
    const required = (value: string) => (value ? undefined : 'Required')


    return (
        <Modal
            isOpen={isOpen}
            hideCloseButton>
            <Form
                onSubmit={handleSubmit}>
                {props => (
                    <form>
                        <div>
                            <label>Enter your name</label>
                            <Field
                                name="userName"
                                validate={required}
                                component={FormInput} />
                            <Button
                                onClick={props.handleSubmit}
                                text="Submit" />
                        </div>
                    </form>
                )}
            </Form>
        </Modal >
    )
}

export default ModalRegistration;
