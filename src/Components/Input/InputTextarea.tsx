import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps,
} from 'react-final-form';
import React from 'react';
import { StyledTextarea, ErrorLabel, InputWrapper } from './InputStyles';
import * as types from 'styled-components/cssprop'

interface InputProps extends FieldRenderProps<string> {
  meta: FieldMetaState<string>;
  input: FieldInputProps<string, HTMLElement>;
  disabled?: boolean;
  customStyle?: string;
}

export type TextareaStyleProps = {
  customStyle: string;
};

const TextareaField: React.FC<InputProps> = ({
  meta,
  input,
  disabled,
  customStyle,
}) => {
  return (
    <div>
      <InputWrapper>
        <StyledTextarea
          customStyle={customStyle || ''}
          disabled={disabled}
          value={input.value}
        ></StyledTextarea>
      </InputWrapper>
      {meta && meta.touched && meta.error && (
        <ErrorLabel>{meta.error}</ErrorLabel>
      )}
    </div>
  );
};

export default TextareaField;
