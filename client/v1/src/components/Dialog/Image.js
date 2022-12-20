import React from 'react';
import { Dialog, DialogContainer, DialogDescription } from './styles';
import { imgOptimize } from '../../utils/cloudinaryImgOptimize';

const DialogImage = ({ open, setOpenDialogImg, imgUrl }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setOpenDialogImg(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} keepMounted>
      <DialogContainer className="image">
        <img src={imgOptimize(imgUrl.fileUrl, imgUrl.fileContentType)} alt="img" />
        <DialogDescription>
          <a href={imgUrl.fileUrl} target="_blank" rel="noreferrer">
            Open original image
          </a>
        </DialogDescription>
      </DialogContainer>
    </Dialog>
  );
};

export default DialogImage;
