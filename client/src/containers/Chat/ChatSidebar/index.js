import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import {
  SidebarWrapper,
  SidebarTitle,
  DMContainer,
  ChannelContainer,
  ChannelTitle,
  ChannelItem,
  ChannelLink,
  ChannelName,
} from './styles';
import { Avatar, Badge } from '@mui/material';
import { getListGroupChannels, getListDMs } from '../../../redux/actions/channel.action';

const Sidebar = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;

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
        <SidebarTitle>Chat Room</SidebarTitle>
        <DMContainer>
          <ChannelTitle className="channel__title">DIRECT MESSAGES</ChannelTitle>
          {DMs &&
            DMs.map((element, i) => (
              <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
                <ChannelLink to={`/channel/${element._id}`} className="channel__link">
                  <Badge overlap="circular" badgeContent=" " variant="dot" className={`${element.members[0].active}`}>
                    <Avatar className="channel__avatar" />
                  </Badge>
                  <ChannelName className="channel__name">{element.members[0].username}</ChannelName>
                </ChannelLink>
              </ChannelItem>
            ))}
        </DMContainer>
        <ChannelContainer>
          <ChannelTitle className="channel__title">CHANNELS</ChannelTitle>
          {channels &&
            channels.map((element, i) => (
              <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
                <ChannelLink to={`/channel/${element._id}`} className="channel__link">
                  <div className="circle">#</div>
                  <ChannelName className="channel__name">{element.channelName}</ChannelName>
                </ChannelLink>
              </ChannelItem>
            ))}
        </ChannelContainer>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
