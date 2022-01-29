import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation';
import ChannelInfo from './ChannelInfo';
import channelService from '../../../services/channel.api';

const ChatContent = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;
  const { success } = useSelector((state) => state.contact);

  const { data: detailChannelData, mutate } = channelService.useGetDetailChannel(channelId);

  const [showSidebarInfo, setShowSidebarInfo] = useState(false);

  useEffect(() => {
    if (channelId) {
      setShowSidebarInfo(false);
    }
  }, [channelId]);

  const toggleInfo = useCallback(
    (toggle) => (e) => {
      e.preventDefault();
      setShowSidebarInfo(toggle);
    },
    []
  );
  useEffect(() => {
    if (success) {
      mutate();
    }
  }, [success, mutate]);

  return (
    <Grid container wrap="nowrap">
      <Conversation toggleInfo={toggleInfo} channelId={channelId} detailChannel={detailChannelData} />
      {showSidebarInfo && (
        <ChannelInfo
          setIsShown={setShowSidebarInfo}
          isShown={showSidebarInfo}
          toggleInfo={toggleInfo}
          detailChannel={detailChannelData}
        />
      )}
    </Grid>
  );
};

export default ChatContent;
