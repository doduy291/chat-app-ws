import styled from '@emotion/styled';
import { Dialog as DialogMui } from '@mui/material';

export const Dialog = styled(DialogMui)`
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

  .MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
  }
`;
export const DialogContainer = styled.div`
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
    max-height: 80vh;
    object-fit: cover;
  }
`;
export const DialogDescription = styled.span`
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

export const Frame = styled.div`
  border: 2px dashed hsla(0, 0%, 100%, 0.4);
  padding: 1rem;
`;
