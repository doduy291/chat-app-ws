import React from 'react';
import { Modal, ModalContainer, ModalDescription, Backdrop, Frame } from './styles';

const ModalError = ({ open, setUploadedError, children }) => {
  const handleClose = (e) => {
    setUploadedError(false);
  };
  return (
    <Modal open={open} onClose={handleClose} BackdropComponent={Backdrop} keepMounted>
      <ModalContainer>
        <Frame>
          <ModalDescription>{children}</ModalDescription>
        </Frame>
      </ModalContainer>
    </Modal>
  );
};

export default ModalError;
