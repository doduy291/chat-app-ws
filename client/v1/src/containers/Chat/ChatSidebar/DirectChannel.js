import React from 'react';
import cn from 'classnames';
import { DirectChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { Avatar, Badge } from '@mui/material';
import channelService from '../../../services/channel.api';

const DirectChannel = React.memo(({ channelId }) => {
  const { data: directChannelsData } = channelService.useGetListDirectChannels();

  return (
    <DirectChannelContainer>
      <ChannelTitle className="channel__title">
        <span>DIRECT MESSAGES</span>
      </ChannelTitle>
      {directChannelsData?.map((element, i) => (
        <ChannelItem className={cn('channel__item', { active: channelId === element._id })} key={i}>
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
