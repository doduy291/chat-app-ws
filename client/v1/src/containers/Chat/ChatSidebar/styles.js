import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 300px;
  background-color: var(--background-color2);
  border-right: 1px solid var(--border-color);

  .channel {
    width: 100%;
  }

  .channel__avatar {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 680px) {
    width: 0;
    flex: 0;
    border-right: none;
  }
`;

export const SidebarTitle = styled.h3`
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
`;

export const DirectChannelContainer = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;
export const ChannelContainer = styled.div`
  width: 100%;
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: var(--circle-color);
    border-radius: 50%;
  }
`;
export const ChannelTitle = styled.div`
  display: block;
  position: relative;
  color: var(--font-lighter-color);
  margin-bottom: 1rem;
  padding: 0 1.5rem;

  span {
    font-size: 15px;
  }
  .add-icon {
    position: absolute;
    top: 0;
    right: 2rem;
    cursor: pointer;

    .MuiSvgIcon-root {
      color: var(--icon-default-color);

      &:hover {
        color: var(--main-color);
      }
    }
  }
  @media screen and (max-width: 680px) {
    .add-icon {
      display: none;
    }
  }
`;

export const ChannelItem = styled.div`
  padding: 6px 1.5rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: var(--main-lighter-color2);
  }
  &.active {
    color: #fff;
    background-color: var(--main-color);
    pointer-events: none;

    .circle {
      background-color: #1bab6f;
      color: #fff;
    }

    .channel__name {
      color: #fff;
    }
  }
  .MuiBadge-root {
    .MuiBadge-badge {
      min-width: 13px;
      height: 13px;
      border-radius: 50%;
    }
    &.online > .MuiBadge-badge {
      background-color: #22b534;
    }
    &.offline > .MuiBadge-badge {
      background-color: transparent;
    }
    &.busy > .MuiBadge-badge {
      background-color: #faa81a;
    }
  }

  @media screen and (max-width: 680px) {
    &.active {
      background-color: transparent;
    }
    .MuiBadge-root {
      display: none;
    }
  }
`;
export const ChannelLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const ChannelName = styled.div`
  margin-left: 10px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
