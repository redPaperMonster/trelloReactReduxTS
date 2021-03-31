
import React from 'react'
import { Button, Modal, FormInput } from '../Components';
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux';
import { userActions } from '../Store';

interface ModalProps {
    isOpen: boolean
}
interface Values {
    userName: string
}

const ModalRegistration: React.FC<ModalProps> = ({
    isOpen }) => {

    const dispatch = useDispatch();

    const handleSubmit = (values: Values) => {
        dispatch(userActions.setUserName(values.userName))
    }
    const required = (value: string) => (value ? undefined : "you didn't enter your name!")

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
