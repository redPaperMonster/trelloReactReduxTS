
import { FieldInputProps, FieldMetaState, FieldRenderProps } from "react-final-form";
import React, { ChangeEvent } from "react";
import { CommonInput, ErrorLabel, InputWrapper } from "./InputStyles";

interface InputProps
    extends FieldRenderProps<string> {
    meta: FieldMetaState<string>,
    input: FieldInputProps<string, HTMLElement>,
    customSize?: number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    focused?: boolean
}



const FormInput: React.FC<InputProps> = ({
    meta,
    input,
    customSize,
    onChange,
    focused }) => {
    const size: number = customSize || 20;
    return (
        <div>
            <InputWrapper>
                <CommonInput {...input}
                    value={input.value}
                    type="text"
                    size={size}
                    onChange={onChange !== undefined ? onChange : input.onChange}
                    autoFocus={focused} />
            </InputWrapper>
            { meta && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        </div>
    )
}


export default FormInput;