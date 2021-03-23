import styled from 'styled-components'
import { TextareaStyleProps } from './FormTextarea'

export const CommonInput = styled.input`
margin: 1em;
font-size: 1em;`

export const ErrorLabel = styled.span`
line-height: 32px;
color: #800;
font-weight: bold;`

export const InputWrapper = styled.div`
display: flex;
justify-content: center`

export const StyledTextarea = styled.textarea<TextareaStyleProps>`
max-width: 150px;
max-height: 150px;
font-weight: bold;
color: black;
font-size: 1.2em;
height: auto;
outline: none;
resize: none;
word-break: break-word;
&:disabled {
     background-color: darkgray;
     border: none;
     text-align: center;

}
 ${(props) => props.customStyleDisabled};
`

//     &: invalid {
//         border: 2px dashed red;
// }

// &: valid {
//     border: 2px solid lime;
// }