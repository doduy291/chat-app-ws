import React from 'react';
import { Modal, ModalContainer, ModalDescription, Backdrop, Frame } from './styles';

const ModalError = ({ open, setUploadedError }) => {
  const handleClose = (e) => {
    setUploadedError(false);
  };
  return (
    <Modal open={open} onClose={handleClose} BackdropComponent={Backdrop} keepMounted>
      <ModalContainer>
        <Frame>
          <ModalDescription>
            <span>Your file size is too large</span>
            <p>Max size is 5.00 MB</p>
          </ModalDescription>
        </Frame>
      </ModalContainer>
    </Modal>
  );
};

export default ModalError;
