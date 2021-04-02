import React, { useState } from 'react'
import { CommentItemWrapper, ButtonWrapper, TitleWrapper, TextWrapper } from './CommentsStyles';
import { Button } from ".."
import { Field, Form } from 'react-final-form';
import { commentActions } from '../../Store';
import { useDispatch } from 'react-redux';
import { CommentType, fieldRequired } from '../../Utils';
import { FIStyle, TextareaField } from '..';

interface CommentProps {
    comment: CommentType
}
export interface Values {
    text: string
}
const CommentItem: React.FC<CommentProps> = ({
    comment }) => {

    const [isRedacted, setRedacted] = useState<boolean>(false)

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
                        <TitleWrapper>
                            <label>{comment.author}:</label>
                        </TitleWrapper>
                        <TextWrapper>
                            <Field name="text"
                                customSize={20}
                                bgStyle={FIStyle.modalBG}
                                validate={fieldRequired}
                                disabled={!isRedacted}
                                component={TextareaField} />
                        </TextWrapper>
                        <ButtonWrapper>
                            <Button
                                customStyles="margin-right: 5px; margin-bottom: 5px;"
                                onClick={handleSubmit}
                                text={isRedacted ? '💾' : '✎'} />
                            <Button
                                onClick={() => dispatch(commentActions.deleteComment(comment.id))}
                                text="🗑" />
                        </ButtonWrapper></CommentItemWrapper>
                </form>
            )
            }
        </Form >



    )
}

export default CommentItem;