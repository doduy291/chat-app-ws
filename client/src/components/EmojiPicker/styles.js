import styled from '@emotion/styled';

export const EmojiPickerContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 6vh;
  z-index: 10;
  /* visibility: ${(props) => (props.emojiOpen ? 'visible' : 'hidden')}; */
  visibility: hidden;

  &.visible {
    visibility: visible;
  }

  .emoji-mart-search {
    display: none;
  }
  .emoji-mart-scroll + .emoji-mart-bar {
    display: none;
  }

  .emoji-mart-anchor {
    .emoji-mart-anchor-icon {
      color: var(--icon-default-color);
    }

    &.emoji-mart-anchor-selected {
      .emoji-mart-anchor-icon {
        color: var(--main-color);
      }
      .emoji-mart-anchor-bar {
        background-color: var(--main-color) !important;
      }
    }
  }
  .emoji-mart-emoji {
    span {
      cursor: pointer;
    }
  }
  .emoji-mart-scroll {
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
  }
`;
