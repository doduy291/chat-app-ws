import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarWrapper, Title, DMContainer, ChannelContainer } from './styles';
import { Avatar, Badge } from '@mui/material';
import { getListGroupChannels, getListDMs } from '../../../redux/actions/channel.action';
import { Link } from 'react-router-dom';

const Sidebar = ({ channelId }) => {
  const { channels, DMs } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListGroupChannels());
    dispatch(getListDMs());
    return () => {};
  }, [dispatch]);

  return (
    <SidebarWrapper>
      <div className="channel">
        <Title>Chat Room</Title>
        <DMContainer>
          <span className="channel__title">DIRECT MESSAGES</span>
          {DMs &&
            DMs.map((element, i) => (
              <div className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
                <Link to={`/channel/${element._id}`} className="channel__link">
                  <Badge overlap="circular" badgeContent=" " variant="dot" className={`${element.members[0].active}`}>
                    <Avatar className="channel__avatar" />
                  </Badge>
                  <div className="channel__name">{element.members[0].username}</div>
                </Link>
              </div>
            ))}
        </DMContainer>
        <ChannelContainer>
          <span className="channel__title">CHANNELS</span>
          {channels &&
            channels.map((element, i) => (
              <div className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
                <Link to={`/channel/${element._id}`} className="channel__link">
                  <div className="circle">#</div>
                  <div className="channel__name">{element.channelName}</div>
                </Link>
              </div>
            ))}
        </ChannelContainer>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
