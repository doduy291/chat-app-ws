import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  max-width: 330px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;

  .channel {
    width: 100%;
  }

  .channel__avatar {
    width: 40px;
    height: 40px;
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

export const DMContainer = styled.div`
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
    background-color: #f1f1f1;
    border-radius: 50%;
  }
`;
export const ChannelTitle = styled.span`
  display: block;
  color: #727473;
  font-size: 15px;
  margin-bottom: 1rem;
  padding: 0 1.5rem;
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
