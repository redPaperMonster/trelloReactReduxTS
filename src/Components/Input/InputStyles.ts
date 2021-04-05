import styled from 'styled-components';
import { InputFieldStyle } from './InputField';
import { TextareaStyleProps } from './InputTextarea';

export const CommonInput = styled.input<InputFieldStyle>`
  margin: 1em;
  font-size: 1em;
  text-overflow: ellipsis;
  outline: none;
  color: black;
  font-weight: bold;
  ${(props) => props.customTextAlign}
  margin: 0px 0px 16px 16px;
  &:disabled {
    background-color: ${(props) => props.backGroundColor};
    border: none;
    color: black;
    pointer-events: none;
  }
`;

export const ErrorLabel = styled.span`
  line-height: 32px;
  color: #800;
  font-weight: bold;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledTextarea = styled.textarea<TextareaStyleProps>`
  background-color: white;
  width: 100%;
  max-height: 150px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: auto;
  color: black;
  font-size: 1.2em;
  height: auto;
  outline: none;
  resize: none;
  word-break: break-word;
  &:disabled {
    border: none;
  }
  ${(props) => props.customStyle};
`;
// ${(props) => props.bg}
