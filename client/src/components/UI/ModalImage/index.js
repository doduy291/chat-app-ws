import React from 'react';
import { Modal, ModalContainer, ModalDescription, Backdrop } from './styles';
import { imgOptimize } from '../../../utils/cloudinaryImgOptimize';

const ModalImage = ({ modalImg, setModalImg, imgUrl }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setModalImg(false);
  };
  return (
    <Modal open={modalImg} onClose={handleClose} BackdropComponent={Backdrop} keepMounted>
      <ModalContainer>
        <img src={imgOptimize(imgUrl)} alt="img" />
        <ModalDescription>
          <a href={imgUrl} target="_blank" rel="noreferrer">
            Open original image
          </a>
        </ModalDescription>
      </ModalContainer>
    </Modal>
  );
};

export default ModalImage;
