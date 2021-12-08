import styled from '@emotion/styled';

export const ContactWrapper = styled.div`
  display: flex;
  width: 100%;

  .line-container {
    padding: 0 24px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
  .circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ebebeb;
    cursor: pointer;
    transition: 0.4s;
    color: #666666;
    background-color: #d3d3d3;

    &:hover {
      border: 1px solid var(--main-color);
      color: #fff;
      box-shadow: inset 0 0 0 2em var(--main-color);
    }
    &.remove:hover {
      box-shadow: inset 0 0 0 2em var(--danger-color);
      border: 1px solid var(--danger-color);
    }
  }
  .scrollSpacer {
    display: block;
    height: 30px;
    width: 100%;
  }

  .MuiBadge-badge {
    min-width: 13px;
    height: 13px;
    border-radius: 50%;
    &.online {
      background-color: #22b534;
    }
    &.offline {
      background-color: #22b534;
    }
  }
`;
