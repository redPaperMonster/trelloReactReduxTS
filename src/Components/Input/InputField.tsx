import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps,
} from 'react-final-form';
import React from 'react';
import { CommonInput, ErrorLabel, InputWrapper } from './InputStyles';

interface InputProps extends FieldRenderProps<string> {
  meta: FieldMetaState<string>;
  input: FieldInputProps<string, HTMLElement>;
  customSize?: number;
  disabled?: boolean;
  bgStyle?: string;
  customTextAlign?: string;
}

export enum InputFieldTheme {
  defaultBG = 'darkgray',
  modalBG = 'white',
  textAlignCenter = 'text-align: center;',
}

export type InputFieldStyle = {
  backGroundColor: string;
  customTextAlign: string;
};

const InputField: React.FC<InputProps> = ({
  meta,
  input,
  customSize = 20,
  disabled,
  bgStyle = InputFieldTheme.defaultBG,
  customTextAlign = '',
}) => {
  return (
    <div>
      <InputWrapper>
        <CommonInput
          {...input}
          value={input.value}
          disabled={disabled}
          type="text"
          size={customSize}
          customTextAlign={customTextAlign}
          backGroundColor={bgStyle}
        />
      </InputWrapper>
      {meta && meta.touched && meta.error && (
        <ErrorLabel>{meta.error}</ErrorLabel>
      )}
    </div>
  );
};

export default InputField;
