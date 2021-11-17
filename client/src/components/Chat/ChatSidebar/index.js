import React from 'react';
import { SidebarWrapper, Title, DMContainer, ChannelContainer } from './styles';
import { Avatar, Badge } from '@mui/material';
const Sidebar = () => {
  return (
    <SidebarWrapper>
      <div className="channel">
        <Title>Chat Room</Title>
        <DMContainer>
          <span className="channel__title">DIRECT MESSAGES</span>
          <div className="channel__item">
            <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
              <Avatar className="channel__avatar" />
            </Badge>
            <div className="channel__name">Username</div>
          </div>
          <div className="channel__item">
            <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
              <Avatar className="channel__avatar" />
            </Badge>
            <div className="channel__name">Username</div>
          </div>
          <div className="channel__item">
            <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
              <Avatar className="channel__avatar" />
            </Badge>
            <div className="channel__name">Username</div>
          </div>
        </DMContainer>
        <ChannelContainer>
          <span className="channel__title">CHANNELS</span>
          <div className="channel__item active">
            <div className="circle">#</div>
            <div className="channel__name">Channel name</div>
          </div>
          <div className="channel__item">
            <div className="circle">#</div>
            <div className="channel__name">Channel name</div>
          </div>
          <div className="channel__item">
            <div className="circle">#</div>
            <div className="channel__name">Channel name</div>
          </div>
          <div className="channel__item">
            <div className="circle">#</div>
            <div className="channel__name">Channel name</div>
          </div>
        </ChannelContainer>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
