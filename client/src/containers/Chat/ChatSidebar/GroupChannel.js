import React, { useState, useEffect } from 'react';
import { ChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { fetchGetListGroupChannels } from '../../../api/channel.api';

const GroupChannel = React.memo(({ channelId }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGetListGroupChannels(setGroups);
  }, []);

  return (
    <ChannelContainer>
      <ChannelTitle className="channel__title">CHANNELS</ChannelTitle>
      {groups?.map((element, i) => (
        <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
          <ChannelLink to={`/channel/${element._id}`} className="channel__link">
            <div className="circle">#</div>
            <ChannelName className="channel__name">{element.channelName}</ChannelName>
          </ChannelLink>
        </ChannelItem>
      ))}
    </ChannelContainer>
  );
});

export default GroupChannel;
