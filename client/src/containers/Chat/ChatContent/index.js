import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AvatarGroup, Avatar } from '@mui/material';
import { Info, MoreVert, Settings, Mood, AttachFile, Send } from '@mui/icons-material';

import {
  ChatWrapper,
  ChatHeader,
  HeaderLeft,
  HeaderRight,
  ChatView,
  ChatViewContainer,
  ChatFooter,
  ChatHeaderTitle,
  ChatHeaderMemberCount,
  ChatViewContent,
  ChatMsg,
  ChatMsgText,
  ChatMsgTyping,
  ChatFooterContainer,
  ChatFooterTextarea,
  ChatFooterSend,
  Textarea,
  TextareaCustom,
  TextareaButtons,
} from './styles';
import { renderConversations } from './conversation';

const ChatContent = ({ toggleInfo }) => {
  const { detailChannel } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);
  const ws = useRef();

  useEffect(() => {
    // Disable pressing Enter to go down a line
    let textarea = document.querySelector('.textarea__custom');
    textarea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && !e.shiftKey) e.preventDefault();
    });
  }, []);

  useEffect(() => {
    //   ws.current = new WebSocket(
    //     process.env.NODE_ENV === 'development'
    //       ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
    //       : process.env.REACT_APP_API_SOCKEt_URL
    //   );
    //   ws.current.onopen = () => {
    //     console.log('Connected WebSocket from Server ✅');
    //   };
    //   ws.current.onmessage = (message) => {
    //     console.log(`New message: ${message.data}`);
    //   };
    //   ws.current.onclose = () => {
    //     console.log('Disconnected WebSocket from Server ❌');
    //   };
    //   // setTimeout(() => {
    //   //   ws.current.send(JSON.stringify({ message: 'Helloooooooooo server' }));
    //   // }, 2000);
    //   return () => {
    //     console.log('Cleaning up! 🧼');
    //     ws.current.close();
    //   };
  }, []);

  return (
    <>
      <ChatWrapper>
        <ChatHeader className="chat-header overlap-top">
          <HeaderLeft className="chat-header__left">
            <ChatHeaderTitle className="chat-header__title">
              {detailChannel.channelType === 'direct' ? detailChannel.members[0].username : detailChannel.channelName}
            </ChatHeaderTitle>
            {detailChannel.channelType === 'group' ? (
              <>
                <div className="dot"></div>
                <ChatHeaderMemberCount className="chat-header__member-count">
                  <AvatarGroup max={3}>
                    {detailChannel.members.map((element, i) => (
                      <Avatar className="chat-header__avatar" key={i} />
                    ))}
                  </AvatarGroup>
                  <span>+{detailChannel.members.filter((element) => element.active === 'online').length} Online</span>
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
        </ChatHeader>

        <ChatView className="chat-view">
          <div className="blur-back"></div>
          <ChatViewContainer className="chat-view__container scroller">
            <ChatViewContent className="chat-view__content">
              {messages && renderConversations(messages)}
              <div className="scrollSpacer"></div>
            </ChatViewContent>
          </ChatViewContainer>
          <ChatMsgTyping className="chat-msg__typing">Username is typing...</ChatMsgTyping>
        </ChatView>
        <ChatFooter className="chat-footer">
          <ChatFooterContainer className="chat-footer__container">
            <ChatFooterTextarea className="chat-footer__textarea">
              <Textarea className="textarea">
                <TextareaCustom
                  className="textarea__custom"
                  role="textbox"
                  contentEditable="true"
                  aria-multiline="true"
                ></TextareaCustom>
              </Textarea>
              <TextareaButtons className="textarea-buttons">
                <AttachFile />
                <Mood />
              </TextareaButtons>
            </ChatFooterTextarea>

            <ChatFooterSend className="chat-footer__send">
              <Send />
              <span>Send</span>
            </ChatFooterSend>
          </ChatFooterContainer>
        </ChatFooter>
      </ChatWrapper>
    </>
  );
};

export default ChatContent;
