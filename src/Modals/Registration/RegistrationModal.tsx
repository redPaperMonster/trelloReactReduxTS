
import React from 'react'
import { Button, Modal, FieldInput } from '../../Components';
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux';
import { userActions } from '../../Store';
import { fieldRequired } from '../../Utils';

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
                                validate={fieldRequired}
                                component={FieldInput} />
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
