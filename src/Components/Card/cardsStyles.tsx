import styled from 'styled-components'

export const CardItem = styled.div`
max-width: 180px;
min-height: 50px;
margin: 10px;
text-align: center;
cursor: pointer;
background-color: #fff;
`

export const CardWrapper = styled.div`
display: flex;
justify-content: space-between; `

export const CardTitle = styled.span`
        display: inline-block;
        font-weight: bold;
        font-size: 1em;
        max-height: 50px
        text-align: center;
        margin: 0;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        line-height: 1.65;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
         word-break: break-all;
`;

export const CardButton = styled.button`
color: black;
border: none;
border-radius: 3px;`;

export const CardButtonWrapper = styled.div`
flex-basis: 10%
width: 30px;
height: 30px;
top: 0;
right: 0;
position: relative; `

export const CardTitleWrapper = styled.div`
flex-basis: 80%;
max-height: 50px;

margin-right: 10px;

`
export const CommentsCountWrapper = styled.div`
flex-basis: 10%;
margin-right: 10px;
`