import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { Grid } from '@mui/material';
import ChatChannelInfo from '../containers/Chat/ChatChannelInfo';
import ChatSidebar from '../containers/Chat/ChatSidebar';
import ChatContent from '../containers/Chat/ChatContent';

import { getSelectedChannel } from '../redux/actions/channel.action';
import { getMessageChannel } from '../redux/actions/message.action';

const ChannelPage = () => {
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch('/channel/:channelId');

  const channelId = match?.params?.channelId;
  const checkPath = location.pathname === '/channel' || [location.pathname].includes('/');

  const toggleInfo = (toggle) => (e) => {
    e.preventDefault();
    setShowSidebarInfo(toggle);
  };

  useEffect(() => {
    if (channelId) {
      dispatch(getSelectedChannel({ channelId }));
      dispatch(getMessageChannel({ channelId }));
    }
  }, [dispatch, channelId]);

  return (
    <>
      <Grid container spacing={0}>
        <ChatSidebar channelId={channelId} />
        {checkPath ? (
          <div>Looking for someone to chat bro.</div>
        ) : (
          <>
            <ChatContent toggleInfo={toggleInfo} />
            <ChatChannelInfo isShown={showSidebarInfo} toggleInfo={toggleInfo} />
          </>
        )}
      </Grid>
    </>
  );
};

export default ChannelPage;
