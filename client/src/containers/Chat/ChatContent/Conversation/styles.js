import styled from '@emotion/styled';

export const ChatWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 14px;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;

  .scrollSpacer {
    display: block;
    width: 100%;
    height: 10px;
  }
`;

export const ChatView = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  background-color: var(--background-color);
  flex: 1 1 auto;

  .blur-back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: var(--blur-background-color);
    backdrop-filter: blur(12px);
    z-index: 1;
  }
`;

export const ChatViewContainer = styled.div`
  overflow-y: scroll;
  padding-top: 20vh;

  &.scroller {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

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
    background: var(--background-color);
    border-radius: 6px;
  }
`;

export const ChatViewContent = styled.div`
  color: #000;
  padding: 0 1.5rem;
`;
export const ChatMsg = styled.div`
  display: flex;
  color: var(--font-default-color2);

  &.chat-msg--you {
    color: var(--font-default-color);
    flex-direction: row-reverse;
  }
`;
export const ChatMsgText = styled.span`
  display: block;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: hidden;

  &.chat-msg__text--you {
    background-color: var(--main-lighter-color2);
  }

  img {
    max-width: 400px;
    max-height: 300px;
    min-width: 100%;
    min-height: 100%;
    cursor: pointer;
  }
`;

export const ChatMsgTimestamp = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 5px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-left: 2px;
  margin-right: 2px;

  .datetime {
    font-weight: 400;
    color: #6a6f6b;
  }
  .chat-msg__avatar {
    width: 17px;
    height: 17px;
  }
  &.chat-msg__timestamp--you {
    flex-direction: row-reverse;
  }
`;
export const ChatMsgTyping = styled.div`
  position: absolute;
  bottom: -3px;
  left: 1.8rem;
  right: calc(1.5rem + 0.5em);
  border-radius: 2px;
  font-size: 13px;
  color: var(--font-lighter-color);
  font-weight: 500;
  z-index: 10;
`;

export const ChatMsgFile = styled.a`
  display: flex;
  font-size: 13px;
  font-weight: 500;

  .MuiSvgIcon-root {
    color: var(--main-lighter-color);
    font-size: 1.2rem;
  }
`;
