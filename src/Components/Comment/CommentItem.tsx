import * as React from 'react';
import { ChangeEvent, useState } from 'react'
import { CommentItemWrapper, CommentInfoWrapper, ButtonWrapper } from './CommentsStyles';
import { Button, FormTextarea } from ".."
import { Field, Form } from 'react-final-form';
import { CommentType } from '../../Store';

interface CommentProps {
    comment: CommentType,
    handleDeleteComment: (id: string) => void,
    handleUpdateComment: (updatedComment: CommentType) => void
}

const CommentItem: React.FC<CommentProps> = ({
    comment,
    handleDeleteComment,
    handleUpdateComment }) => {

    const [isRedacted, setRedacted] = useState<boolean>(false)
    const [commentText, setCommentText] = useState<string>(comment.text)
    const required = (value: string) => (value ? undefined : "enter comments text")

    const saveChanges = () => {
        handleUpdateComment({ id: comment.id, cardId: comment.cardId, text: commentText, author: comment.author })
        setRedacted(false)
    }

    const handleOnClick = () => {
        isRedacted ? saveChanges() : setRedacted(true)
    }

    return (
        <Form
            onSubmit={handleOnClick}
            initialValues={{ text: commentText }}>
            {props => (
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
                                text-align: start;};  "
                                validate={required}
                                disabled={!isRedacted}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.currentTarget.value)}
                                component={FormTextarea} />
                        </CommentInfoWrapper>
                        <ButtonWrapper>
                            <Button
                                customStyles="margin-right: 5px;"
                                onClick={props.handleSubmit}
                                text={isRedacted ? '💾' : '✎'} />
                            <Button
                                onClick={() => handleDeleteComment(comment.id)}
                                text="🗑" />
                        </ButtonWrapper></CommentItemWrapper>
                </form>
            )}
        </Form>



    )
}

export default CommentItem;