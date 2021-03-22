
import React, { ChangeEvent } from "react";
import { CommonInput } from "./InputStyles";

interface InputProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    customSize?: number,
    focused?: boolean
}



const Input: React.FC<InputProps> = ({
    onChange,
    value,
    customSize,
    focused }) => {

    const size: number = customSize || 20

    return (
        <div>
            <CommonInput
                onChange={onChange}
                value={value}
                type="text"
                size={size}
                autoFocus={focused} />

        </div>
    )
}


export default Input;