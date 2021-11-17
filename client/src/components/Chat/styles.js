import styled from 'styled-components';

export const ChatWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex: 3 1;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 14px;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 1.5rem;
  border-bottom: 1px solid #e5e5e5;

  &.overlap-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;

  .chat-header__title {
    font-size: 1.3rem;
    font-weight: 500;
  }
  .dot {
    width: 4px;
    height: 4px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #cfcfcf;
  }
  .chat-header__member-count {
    display: flex;
    align-items: center;
    column-gap: 8px;

    span {
      font-weight: 500;
    }

    .chat-header__avatar {
      width: 32px;
      height: 32px;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  .MuiSvgIcon-root {
    color: #9ba09e;
    cursor: pointer;

    &:hover {
      color: var(--main-color);
    }
  }
`;

export const ChatView = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  background-color: #f4f7f4;
  flex: 1 1 auto;

  .blur-back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: rgba(244, 247, 244, 0.3);
    backdrop-filter: blur(12px);
    z-index: 1;
  }
`;

export const ChatViewContainer = styled.div`
  overflow-y: scroll;
  padding-top: calc(100% - 85%);

  &.scroller {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .chat-view__content {
    color: #000;
    padding: 0 1.5rem;
  }

  .chat-msg {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    &.chat-msg--you {
      flex-direction: row-reverse;
    }
  }

  .chat-msg__text {
    display: block;
    padding: 12px;
    background-color: #ffffff;
    border-radius: 4px;
    margin-bottom: 7px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px;
    word-wrap: break-word;

    &.chat-msg__text--you {
      background-color: var(--main-lighter-color2);
    }
  }
  .chat-msg__timestamp {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 1rem;

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
  }
  .chat-msg__typing {
    font-size: 13px;
    color: #898989;
    font-weight: 500;
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
  }
`;
export const ChatFooter = styled.div`
  display: flex;
  position: relative;
  padding: 0 1.5rem;
  flex-direction: row;
  background-color: #f4f7f4;

  .chat-footer__container {
    display: flex;
    width: 100%;
    column-gap: 15px;
    margin-top: 7px;
    margin-bottom: 1.5rem;
    margin-right: 0.5em;
  }

  .chat-footer__textarea {
    display: flex;
    width: 100%;
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 5px;
    border: 1px solid #dde0dc;
    background-color: #ffffff;
    color: #898989;
  }

  .textarea {
    position: relative;
    width: 100%;
    background-color: transparent;
    resize: none;
    border: none;
    appearance: none;
    line-height: 1.375rem;
  }

  .textarea__custom {
    user-select: text;
    padding: 12px;
    max-height: 50vh;
    overflow-y: auto;
  }

  .textarea__custom:empty:before {
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
  }

  .textarea-buttons {
    display: flex;
    column-gap: 10px;
    padding: 12px;

    .MuiSvgIcon-root {
      cursor: pointer;

      &:hover {
        color: var(--main-color);
      }
    }
  }
  .chat-footer__send {
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
  }
`;
