import * as React from 'react';
import { useState } from 'react'
import { CommentsType } from '../../App';
import { CommentItemWrapper, CommentAuthor, CommentText, CommentInfoWrapper, ButtonWrapper } from './CommentsStyles';
import { Button, Input } from ".."

interface CommentProps {
    comment: CommentsType,
    handleDeleteComment: (id: string) => void,
    handleUpdateComment: (updatedComment: CommentsType) => void
}

const CommentItem: React.FC<CommentProps> = ({
    comment,
    handleDeleteComment,
    handleUpdateComment }) => {

    const [isEditable, setEditable] = useState<boolean>(false)
    const [commentText, setcommentText] = useState<string>(comment.text)

    const saveChanges = () => {
        handleUpdateComment({ id: comment.id, cardId: comment.cardId, text: commentText, author: comment.author })
        setEditable(false)
    }

    const handleOnClick = () => {
        isEditable ? saveChanges() : setEditable(true)
    }

    const commentInfo = <CommentInfoWrapper>
        <CommentAuthor>{comment.author}:</CommentAuthor>
        <CommentText>{comment.text}</CommentText>
    </CommentInfoWrapper>
    const commentRedact = <CommentInfoWrapper>
        <CommentAuthor>{comment.author}:</CommentAuthor>
        <Input
            value={commentText}
            onChange={e => setcommentText(e.currentTarget.value)} />
    </CommentInfoWrapper>

    return (
        <CommentItemWrapper>
            {isEditable ? commentRedact : commentInfo}
            <ButtonWrapper>
                <Button
                    customStyles="margin-right: 5px;"
                    onClick={handleOnClick}
                    text={isEditable ? '💾' : '✎'} />
                <Button
                    onClick={() => handleDeleteComment(comment.id)}
                    text="🗑" />
            </ButtonWrapper>
        </CommentItemWrapper>
    )
}

export default CommentItem;