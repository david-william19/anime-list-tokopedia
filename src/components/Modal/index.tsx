import styled from "@emotion/styled";
import React from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;

interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({children, isOpen}) => {
    if(!isOpen) return null;
    return (
        <ModalOverlay>
          <ModalContent>
            {children}
          </ModalContent>
        </ModalOverlay>
      );
    };

export default Modal;