
import { FieldInputProps, FieldMetaState, FieldRenderProps } from "react-final-form";
import React, { ChangeEvent } from "react";
import { StyledTextarea, ErrorLabel, InputWrapper } from "./InputStyles";

interface InputProps
    extends FieldRenderProps<string> {
    meta: FieldMetaState<string>,
    input: FieldInputProps<string, HTMLElement>,
    customSize?: number,
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    focused?: boolean,
    disabled?: boolean,
    customStyle?: string,
}

export type TextareaStyleProps = {
    customStyleDisabled: string;
};

const FormTextarea: React.FC<InputProps> = ({
    meta,
    input,
    customSize,
    onChange,
    focused,
    disabled,
    customStyle }) => {
    const size: number = customSize || 20;
    return (
        <div><InputWrapper>
            <StyledTextarea
                customStyleDisabled={customStyle || ""}
                disabled={disabled}
                value={input.value}
                onChange={onChange !== undefined ? onChange : input.onChange}
                autoFocus={focused}></StyledTextarea></InputWrapper>
            { meta && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        </div >
    )
}


export default FormTextarea;