import React, { useState } from 'react'
import { CommentItemWrapper, CommentInfoWrapper, ButtonWrapper, CommentInput } from './CommentsStyles';
import { Button, FormTextarea } from ".."
import { Field, Form } from 'react-final-form';
import { commentActions, CommentType } from '../../Store';
import { useDispatch } from 'react-redux';

interface CommentProps {
    comment: CommentType
}
export interface Values {
    text: string
}
const CommentItem: React.FC<CommentProps> = ({
    comment }) => {

    const [isRedacted, setRedacted] = useState<boolean>(false)

    const required = (value: string) => (value ? undefined : "enter comments text")

    const dispatch = useDispatch();

    const saveChanges = (values: Values) => {
        const newComment = { id: comment.id, cardId: comment.cardId, text: values.text, author: comment.author }
        dispatch(commentActions.updateComment(newComment))
        setRedacted(false)
    }

    const updateAction = (values: Values) => {
        isRedacted ? saveChanges(values) : setRedacted(true)
    }

    return (
        <Form
            onSubmit={updateAction}
            initialValues={{ text: comment.text }}>
            {({ handleSubmit }) => (
                <form>
                    <CommentItemWrapper>
                        <CommentInfoWrapper>
                            <label>{comment.author}:</label>
                            <Field name="text"
                                customSize={10}
                                customStyle="
                            min-width:350px; 
                            &:disabled {
                                background-color:white; 
                                min-width:350px;
                                text-align: start;}; "
                                validate={required}
                                disabled={!isRedacted}
                                component={FormTextarea} />
                        </CommentInfoWrapper>
                        <ButtonWrapper>
                            <Button
                                customStyles="margin-right: 5px;"
                                onClick={handleSubmit}
                                text={isRedacted ? '💾' : '✎'} />
                            <Button
                                onClick={() => dispatch(commentActions.deleteComment(comment.id))}
                                text="🗑" />
                        </ButtonWrapper></CommentItemWrapper>
                </form>
            )}
        </Form>



    )
}

export default CommentItem;