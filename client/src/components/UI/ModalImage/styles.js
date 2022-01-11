import styled from '@emotion/styled';
import { ModalUnstyled } from '@mui/material';

export const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export const ModalContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;

  img {
    max-width: 900px;
    max-height: 300px;
    object-fit: cover;
  }
`;
export const ModalDescription = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: #fff;

  a {
    font-size: 14px;
  }
`;
export const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
