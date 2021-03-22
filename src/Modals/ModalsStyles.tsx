import styled from 'styled-components'

export const CardInfoWrapper = styled.div`
display: flex;
flex-flow: column wrap;
margin-bottom:10px`

export const CardRedactWrapper = styled(CardInfoWrapper)`
flex-shrink: 3;`

export const CardTitle = styled.span`
font-size: 2em;
text-align: center;
word-break: break-all;`

export const CardDescr = styled(CardTitle)`
font-size: 1em;`

export const CardInputWrapper = styled.div``

export const CreateColumnWrapper = styled.div`
display: flex;
flex-flow: column wrap;
justify-content: space-between;`

export const CreateColumnItemWrapper = styled.div`
`

export const CreateCardWrapper = styled.div`
display: flex;
flex-flow: column wrap;
justify-content: space-between;`

export const CreateCardItemWrapper = styled.div`
flex-shrink: 1`

export const CardModalDescr = styled.h5`
font-size: 1em;
word-break: break-all;
margin: 0;`

export const ModalTitle = styled.h2`
font-size: 2em;
text-align: center;
word-break: break-all;
margin: 0;`;

export const CommentsWrapper = styled.div`
max-height: 300px;
overflow-y: auto;`

export const SendCommentWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center`

export const CommentTextarea = styled.textarea`
word-break: break-all;`

