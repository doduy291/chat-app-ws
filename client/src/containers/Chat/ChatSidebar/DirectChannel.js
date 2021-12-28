import React, { useEffect, useState } from 'react';
import { DMContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { Avatar, Badge } from '@mui/material';
import { fetchGetListDMs } from '../../../api/channel.api';

const DirectChannel = React.memo(({ channelId }) => {
  const [DMs, setDMs] = useState([]);

  useEffect(() => {
    fetchGetListDMs(setDMs);
  }, []);

  return (
    <DMContainer>
      <ChannelTitle className="channel__title">DIRECT MESSAGES</ChannelTitle>
      {!DMs ? (
        <div>No one</div>
      ) : (
        DMs?.map((element, i) => (
          <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
            <ChannelLink to={`/channel/${element._id}`} className="channel__link">
              <Badge overlap="circular" badgeContent=" " variant="dot" className={`${element.members[0].active}`}>
                <Avatar className="channel__avatar" />
              </Badge>
              <ChannelName className="channel__name">{element.members[0].username}</ChannelName>
            </ChannelLink>
          </ChannelItem>
        ))
      )}
    </DMContainer>
  );
});

export default DirectChannel;
