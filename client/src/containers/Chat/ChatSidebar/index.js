import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarWrapper, Title, DMContainer, ChannelContainer } from './styles';
import { Avatar, Badge } from '@mui/material';
import { getListChannels } from '../../../redux/actions/channel.action';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { channels } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListChannels());
    return () => {};
  }, [dispatch]);
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
          {channels &&
            channels.map((element, i) => (
              <Link to={`/channel/${element._id}`} key={i}>
                <div className="channel__item active">
                  <div className="circle">#</div>
                  <div className="channel__name">{element.channelName}</div>
                </div>
              </Link>
            ))}
        </ChannelContainer>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
