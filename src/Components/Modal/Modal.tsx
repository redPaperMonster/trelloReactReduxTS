import React from 'react'
import { Button } from '..';
import { CloseButton, ModalContent, ModalWindow } from './ModalStyles';

interface ModalProps {
    isOpen: boolean,
    hideCloseButton?: boolean,
    close?: () => void
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    children,
    hideCloseButton,
    close }) => {

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (!hideCloseButton && e.key === 'Escape' && close !== undefined) {
            close();
        }
    }
    if (!isOpen) return null;
    return (
        <ModalWindow
            onKeyDown={e => handleKeyPress(e)} >
            <ModalContent
                onClick={e => e.stopPropagation()}>
                {children}
                {!hideCloseButton && <CloseButton>
                    <Button
                        onClick={close !== undefined ? close : () => { }}
                        text="❌" /></CloseButton>}
            </ModalContent>
        </ModalWindow>
    )
}

export default Modal;