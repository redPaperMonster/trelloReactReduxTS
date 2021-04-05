import React, { useEffect, useRef } from 'react';
import { Button } from '..';
import { CloseButton, ModalContent, ModalWindow } from './ModalStyles';

interface ModalProps {
  isOpen: boolean;
  hideCloseButton?: boolean;
  close?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  hideCloseButton,
  close,
}) => {
  const focusedElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedElement.current) {
      focusedElement.current.focus();
    }
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hideCloseButton && e.key === 'Escape' && close) {
      close();
    }
  };
  if (!isOpen) return null;
  return (
    <ModalWindow ref={focusedElement} tabIndex={-1} onKeyDown={handleKeyPress}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        {!hideCloseButton && (
          <CloseButton>
            <Button
              onClick={close ? close : () => { }}
              text="❌"
            />
          </CloseButton>
        )}
      </ModalContent>
    </ModalWindow>
  );
};

export default Modal;
