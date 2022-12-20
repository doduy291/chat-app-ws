import styled from '@emotion/styled';

export const ChatHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  height: 80px;
  padding: 0 1.5rem;
  border-bottom: 1px solid var(--border-color);
  flex: 0 0 auto;

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

  .dot {
    width: 4px;
    height: 4px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #cfcfcf;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  .MuiSvgIcon-root {
    color: var(--icon-default-color);
    cursor: pointer;

    &:hover {
      color: var(--main-color);
    }
  }
`;

export const ChatHeaderTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`;
export const ChatHeaderMemberCount = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: var(--main-color);

  span {
    font-weight: 500;
  }

  .MuiAvatar-root {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;
