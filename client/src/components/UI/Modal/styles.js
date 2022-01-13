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
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: var(--danger-color);
  border-radius: 5px;

  &.image {
    display: block;
    background-color: transparent;
    overflow: hidden;
  }

  img {
    max-width: 900px;
    min-width: 100%;
    min-height: 100%;
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

  span {
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    font-size: 14px;
  }

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
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-tap-highlight-color: transparent;
`;

export const Frame = styled.div`
  border: 2px dashed hsla(0, 0%, 100%, 0.4);
  padding: 1rem;
`;
