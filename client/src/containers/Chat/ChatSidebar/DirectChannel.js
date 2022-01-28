import React from 'react';
import { DirectChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { Avatar, Badge } from '@mui/material';
import { useGetListDirectChannels } from '../../../services/channel.api';

const DirectChannel = React.memo(({ channelId }) => {
  const { data: directChannelsData } = useGetListDirectChannels();

  return (
    <DirectChannelContainer>
      <ChannelTitle className="channel__title">
        <span>DIRECT MESSAGES</span>
      </ChannelTitle>
      {directChannelsData?.map((element, i) => (
        <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
          <ChannelLink to={`/channel/${element._id}`} className="channel__link">
            <Badge overlap="circular" badgeContent=" " variant="dot" className={`${element.members[0].active}`}>
              <Avatar className="channel__avatar" />
            </Badge>
            <ChannelName className="channel__name">{element.members[0].username}</ChannelName>
          </ChannelLink>
        </ChannelItem>
      ))}
    </DirectChannelContainer>
  );
});

export default DirectChannel;
