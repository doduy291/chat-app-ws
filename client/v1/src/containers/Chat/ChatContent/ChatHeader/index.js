import React from 'react';
import { AvatarGroup, Avatar } from '@mui/material';
import { Info, MoreVert, Settings } from '@mui/icons-material';
import { ChatHeaderWrapper, HeaderLeft, HeaderRight, ChatHeaderTitle, ChatHeaderMemberCount } from './styles';

const ChatHeader = ({ toggleInfo, detailChannel }) => {
  return (
    <ChatHeaderWrapper className="chat-header overlap-top">
      <HeaderLeft className="chat-header__left">
        <ChatHeaderTitle className="chat-header__title">
          {detailChannel?.channelType === 'direct' ? detailChannel?.members[0].username : detailChannel?.channelName}
        </ChatHeaderTitle>
        {detailChannel?.channelType === 'group' ? (
          <>
            <div className="dot"></div>
            <ChatHeaderMemberCount className="chat-header__member-count">
              <AvatarGroup max={3}>
                {detailChannel?.members.map((element, i) => (
                  <Avatar className="chat-header__avatar" key={i} />
                ))}
              </AvatarGroup>
              <span>+{detailChannel?.members.filter((element) => element.active === 'online').length} Online</span>
            </ChatHeaderMemberCount>
          </>
        ) : (
          ''
        )}
      </HeaderLeft>
      <HeaderRight className="chat-header__right">
        <Info onClick={toggleInfo(true)} />
        <MoreVert />
        <Settings />
      </HeaderRight>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
