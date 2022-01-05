import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { SidebarWrapper, SidebarTitle } from './styles';
import DirectChannel from './DirectChannel';
import GroupChannel from './GroupChannel';

const Sidebar = React.memo(() => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;

  return (
    <SidebarWrapper className="sidebar-wrapper">
      <div className="channel">
        <SidebarTitle>Chat Room</SidebarTitle>
        <DirectChannel channelId={channelId} />
        <GroupChannel channelId={channelId} />
      </div>
    </SidebarWrapper>
  );
});

export default Sidebar;
