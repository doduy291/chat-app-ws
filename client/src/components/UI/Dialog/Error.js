import React from 'react';
import { Dialog, DialogContainer, DialogDescription, Frame } from './styles';

const DialogError = ({ open, setUploadedError, children }) => {
  const handleClose = (e) => {
    setUploadedError(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} keepMounted>
      <DialogContainer>
        <Frame>
          <DialogDescription>{children}</DialogDescription>
        </Frame>
      </DialogContainer>
    </Dialog>
  );
};

export default DialogError;
