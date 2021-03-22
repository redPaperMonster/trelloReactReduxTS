import styled from 'styled-components'

export const ModalWindow = styled.div` height: 100%;
width: 100%;
background-color:rgba(0,0,0,0.4);
position: fixed;
top:0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
transition: 0.5s;
z-index: 100;
pointer-events: all;
text-align: center;`

export const ModalContent = styled.div`

width: 50%;
padding: 20px;
border-radius: 12px;
background-color: #fff;
transform: scale(1);
transition: 0.4s all;`

export const CloseButton = styled.div`
position: fixed;
top: 0;
right: 0;
`