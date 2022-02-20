import styled from '@emotion/styled';
import { Dialog as DialogMui, Avatar } from '@mui/material';

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

  &.create-channel {
    width: 440px;
    flex-direction: column;
    background-color: #fff;
    background-color: var(--background-color2);
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
export const DialogHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 0;

  span {
    font-size: 24px;
    font-weight: 700;
  }
`;
export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;

  .dialog-error-msg {
    color: var(--danger-color);
    font-size: 12px;
    font-style: italic;
    font-weight: 300;
    margin-top: 5px;
  }
  label {
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 500;
    color: var(--font-lighter-color);
  }
  input {
    width: 100%;
    height: 40px;
    font-size: 13px;
    padding: 0 10px;
    border: 1px solid var(--icon-default-color);
    border-radius: 3px;
    margin-top: 5px;
    color: var(--font-default-color);
    background-color: var(--background-color2);

    &::placeholder {
      color: var(--icon-default-color);
    }
  }
`;
export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    min-width: 100px;
    padding: 10px 16px;
    background-color: var(--main-color);
    border-radius: 3px;
    color: #fff;
    font-family: 'Poppins', sans-serif;

    &:hover {
      background-color: var(--main-brighter-color);
    }
  }
`;
export const Frame = styled.div`
  border: 2px dashed hsla(0, 0%, 100%, 0.4);
  padding: 1rem;
`;

export const MultiSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  border: 1px solid var(--icon-default-color);
  border-radius: 3px;
  margin-top: 5px;
  padding: 2px;

  input.multiselect__search {
    width: 50px;
    height: 35px;
    border: none;
    margin-top: 0;
    padding: 5px;
    flex-grow: 1;
  }
`;

export const MultiSelectItem = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--main-color);
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  gap: 5px;

  span {
    font-size: 13px;
    color: #fff;
  }
  .MuiSvgIcon-root {
    color: #fff;
    font-size: 1rem;
    border: 1px solid #fff;
    border-radius: 50%;
  }
`;

export const ListFriendWrapper = styled.div`
  margin-top: 20px;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    right: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--scrollbar-thumb-color);
  }
  &::-webkit-scrollbar-track {
    background: var(--background-color2);
    border-radius: 6px;
  }
`;

export const ListFriendBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  min-height: 50px;
  max-height: 80px;
  position: relative;
`;

export const ListFriendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: var(--main-lighter-color2);
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: var(--main-lighter-color3);
  }
`;

export const ListFriendAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  margin-right: 8px;
`;

export const ListFriendName = styled.div`
  flex: 1 1 auto;
  font-weight: 600;
  font-size: 13px;
`;
export const ListFriendCheckbox = styled.div`
  .checkbox-icon {
    position: unset;
  }
  .checkbox-icon.Mui-checked {
    color: var(--main-color);
  }
`;
