import styled from 'styled-components'

export const CardItem = styled.div`
width: auto;
min-height: 50px;
margin: 10px;
text-align: center;
cursor: pointer;
background-color: #fff;`

export const CardWrapper = styled.div`
display: flex;
justify-content: space-between;`

export const CardTitle = styled.h5`
font-size: 1em;
text-align: center;
margin:0;
word-break: break-all;`;

export const CardButton = styled.button`
display: block;
color: black;
border: none;
border-radius: 3px;`;

export const CardButtonWpapper = styled.div`
width: 30px;
height: 30px;
top: 0;
right: 0;
position: relative;`