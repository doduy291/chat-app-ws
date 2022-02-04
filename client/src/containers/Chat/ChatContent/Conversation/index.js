import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ChatWrapper, ChatView, ChatViewContainer, ChatViewContent, ChatMsgTyping } from './styles';
import ChatFooter from '../ChatFooter';
import ChatHeader from '../ChatHeader';
import Conversations from './Conversations';
import messageService from '../../../../services/message.api';
import useWebsocket from '../../../../hooks/useWebsocket';
import ChatContext from '../../../../contexts/chat.context';

// Because of using router params, useState will keep value in state even if moving to other router params
const Conversation = ({ toggleInfo, detailChannel }) => {
  const { channelId } = useContext(ChatContext);
  const { user } = useSelector((state) => state.user);
  const { data: messagesData } = messageService.useGetMessageChannel({ channelId });

  const [messages, setMessages] = useState({});
  const scrollTargetRef = useRef(null);

  const useWS = useWebsocket(channelId, user, setMessages, 'channel-connection');

  useEffect(() => {
    const setData = () => {
      if (messagesData && !Object.keys(messages).includes(channelId)) {
        return setMessages((cur) => {
          let messageChannel = cur;
          messageChannel[channelId] = messagesData;
          return messageChannel;
        });
      }
    };
    setData();
  }, [messagesData, messages, channelId]);

  // Scroll;
  const messagesLength = messages[channelId]?.currentMsgs?.length;
  useEffect(() => {
    // Does not work without setTimeout
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView(true);
    }, 100);
  }, [messagesLength]);

  return (
    <ChatWrapper className="conversation">
      <ChatHeader detailChannel={detailChannel} toggleInfo={toggleInfo} messages={messages} />
      <ChatView className="chat-view">
        <div className="blur-back"></div>
        <ChatViewContainer className="chat-view__container scroller">
          <ChatViewContent className="chat-view__content">
            <Conversations messages={messages} user={user} channelId={channelId} />
            <div className="scrollSpacer" ref={scrollTargetRef}></div>
          </ChatViewContent>
        </ChatViewContainer>
        <ChatMsgTyping className="chat-msg__typing">Username is typing...</ChatMsgTyping>
      </ChatView>
      <ChatFooter scrollTargetRef={scrollTargetRef} channelId={channelId} useWS={useWS} />
    </ChatWrapper>
  );
};

export default Conversation;
