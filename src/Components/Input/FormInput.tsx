
import { FieldInputProps, FieldMetaState, FieldRenderProps } from "react-final-form";
import React from "react";
import { CommonInput, ErrorLabel } from "./InputStyles";

interface InputProps
    extends FieldRenderProps<string> {
    meta: FieldMetaState<string>,
    input: FieldInputProps<string, HTMLElement>
}



const FormInput: React.FC<InputProps> = ({
    meta,
    input }) => {

    return (
        <div>
            <CommonInput {...input}
                type="text" />
            { meta && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
        </div>
    )
}


export default FormInput;