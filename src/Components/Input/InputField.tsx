
import { FieldInputProps, FieldMetaState, FieldRenderProps } from "react-final-form";
import React, { ChangeEvent } from "react";
import { CommonInput, ErrorLabel, InputWrapper } from "./InputStyles";

interface InputProps
    extends FieldRenderProps<string> {
    meta: FieldMetaState<string>,
    input: FieldInputProps<string, HTMLElement>,
    customSize?: number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    bgStyle?: string,
    customTextAlign?: string

}

export enum FIStyle {
    defaultBG = 'darkgray',
    modalBG = 'white',
    textAlignCenter = 'text-align: center;'
}

export type FieldInputStyle = {
    bg: string,
    customTA: string
};

const FieldInput: React.FC<InputProps> = ({
    meta,
    input,
    customSize = 20,
    onChange,
    disabled,
    bgStyle = FIStyle.defaultBG,
    customTextAlign = '' }) => {
    return (
        <div>
            <InputWrapper>
                <CommonInput {...input}
                    value={input.value}
                    disabled={disabled}
                    type="text"
                    size={customSize}
                    customTA={customTextAlign}
                    onChange={onChange !== undefined ? onChange : input.onChange}
                    bg={bgStyle}
                />
            </InputWrapper>
            { meta && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        </div>
    )
}


export default FieldInput;