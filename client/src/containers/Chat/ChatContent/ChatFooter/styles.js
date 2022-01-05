import styled from '@emotion/styled';

export const ChatFooterWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: #f4f7f4;
`;
export const ChatFooterContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 15px;
  margin-top: 7px;
  margin-bottom: 1.5rem;
  margin-right: 0.5em;
  padding: 0 1.5rem;
`;

export const ChatFooterTextarea = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
  border: 1px solid #dde0dc;
  background-color: #ffffff;
`;
export const TextareaContainer = styled.div`
  display: flex;
`;
export const TextareaWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
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
  align-items: flex-end;
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

export const FileList = styled.ul`
  display: flex;
  gap: 15px;
  padding: 10px 10px;
  /* width: 100%; */
  white-space: nowrap;
  overflow-x: auto;
  background-color: #c2c5c7;
`;

export const FileItem = styled.li`
  display: inline-block;
  background-color: var(--icon-default-color);
  padding: 8px;
  position: relative;
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  /* margin-right: 10px; */
`;

export const FileUploadContainer = styled.div`
  width: 100px;
  height: 100%;
`;
