
import { FieldInputProps, FieldMetaState, FieldRenderProps } from "react-final-form";
import React, { ChangeEvent } from "react";
import { StyledTextarea, ErrorLabel, InputWrapper } from "./InputStyles";

interface InputProps
    extends FieldRenderProps<string> {
    meta: FieldMetaState<string>,
    input: FieldInputProps<string, HTMLElement>,
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    focused?: boolean,
    disabled?: boolean,
    customStyle?: string,
}

export type TextareaStyleProps = {
    customStyle: string;
};



const TextareaField: React.FC<InputProps> = ({
    meta,
    input,
    onChange,
    focused,
    disabled,
    customStyle }) => {
    return (
        <div><InputWrapper>
            <StyledTextarea
                customStyle={customStyle || ""}
                disabled={disabled}
                value={input.value}
                onChange={onChange !== undefined ? onChange : input.onChange}
            //autoFocus={focused}
            >
            </StyledTextarea></InputWrapper>
            { meta && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        </div >
    )
}


export default TextareaField;