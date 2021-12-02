import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Grid } from '@mui/material';

import ChatChannelInfo from './ChatChannelInfo/index';
import ChatSidebar from './ChatSidebar/index';
import ChatContent from './ChatContent/index';

const Chat = () => {
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const location = useLocation();
  const checkPath = [location.pathname].includes('/channel');

  return (
    <>
      <Grid container spacing={0}>
        <ChatSidebar />
        {checkPath ? (
          <div>Looking for someone to chat bro.</div>
        ) : (
          <>
            <ChatContent setShowSidebarInfo={setShowSidebarInfo} />
            <ChatChannelInfo isShowed={{ showSidebarInfo, setShowSidebarInfo }} />
          </>
        )}
      </Grid>
    </>
  );
};

export default Chat;
