import styled from '@emotion/styled';

export const ChatFooterWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--background-color);
  flex: 0 1 auto;
`;
export const ChatFooterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  column-gap: 15px;
  margin-top: 7px;
  margin-bottom: 1.5rem;
  margin-right: 0.5em;
  padding: 0 1.5rem;

  #file-upload {
    width: 0;
    height: 0;
    position: absolute;
  }
`;

export const ChatFooterTextarea = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
  border: 1px solid var(--border-color);

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
    border-radius: 0 6px 6px 0;
  }
`;
export const TextareaContainer = styled.div`
  display: flex;
  background-color: var(--background-color2);
`;
export const TextareaWrapper = styled.div`
  width: 100%;
  min-width: 0;
  position: relative;
`;
export const TextareaTyping = styled.div`
  position: relative;
  width: 100%;
  background-color: transparent;
  resize: none;
  border: none;
  appearance: none;
  line-height: 1.375rem;
`;
export const TextareaCustom = styled.div`
  user-select: text;
  padding: 12px;
  height: 100%;
  max-height: 50vh;
  overflow-y: auto;
  white-space: break-spaces;
  word-break: break-word;
  color: var(--font-default-color);

  &:empty:before {
    content: 'Write a reply...';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 12px;
    cursor: text;
    color: var(--icon-default-color);
  }

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    right: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #e1e4ea;
  }
  &::-webkit-scrollbar-track {
    background: #f1f2f3;
    border-radius: 6px;
  }
`;
export const TextareaButtons = styled.div`
  display: flex;
  column-gap: 10px;
  padding: 12px;

  .MuiSvgIcon-root {
    cursor: pointer;
    color: var(--icon-default-color);

    &:hover {
      color: var(--main-color);
    }
  }
`;
export const ChatFooterSend = styled.div`
  display: flex;
`;

export const ChatFooterButton = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 12px 2rem;
  border-radius: 5px;
  background-color: #1ebf7b;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: var(--main-brighter-color);
  }

  @media screen and (max-width: 965px) {
    padding: 12px 15px;
    span {
      display: none;
    }
  }
`;
export const FileWrapper = styled.div`
  background-color: var(--background-color3);
`;
export const FileList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
`;
export const FileItemBox = styled.div`
  display: flex;
  position: absolute;
  padding: 0 15px;
`;
export const FileItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #90dfae96;
  margin-right: 16px;
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  max-height: 150px;
  border-radius: 3px;
  padding: 10px;
`;

export const ActionBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 25px;
  border-radius: 3px;
  background-color: #585858;
  top: -10px;
  right: -8px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }

  .MuiSvgIcon-root {
    width: 25px;
    height: 23px;
    color: var(--danger-color);
  }
`;

export const FileItemName = styled.span`
  margin-top: auto;
  color: var(--font-default-color);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
`;

export const FileItemDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .MuiSvgIcon-root {
    color: var(--main-lighter-color);
    font-size: 5rem;
  }
`;
