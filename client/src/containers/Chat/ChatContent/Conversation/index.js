import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ChatFooter from '../ChatFooter';
import ChatHeader from '../ChatHeader';
import { ChatWrapper, ChatView, ChatViewContainer, ChatViewContent, ChatMsgTyping } from './styles';
import Conversations from './Conversations';
import messageService from '../../../../services/message.api';

const Conversation = React.memo(({ toggleInfo, channelId, detailChannel }) => {
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState(null);
  const { data: messagesData } = messageService.useGetMessageChannel({ channelId });
  const ws = useRef();
  const scrollTargetRef = useRef(null);

  // Websocket Connection
  useEffect(() => {
    ws.current = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
        : process.env.REACT_APP_API_SOCKET_URL
    );

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ channelId, userId: user._id, type: 'channel-connection' }));
    };
    ws.current.onmessage = (resWS) => {
      const res = JSON.parse(resWS.data);
      if (res?.type === 'res-send-message') {
        setMessages((cur) => {
          let newMsgs = [...cur.currentMsgs, res.msg];
          let page = cur.pageMsg;
          return { currentMsgs: newMsgs, pageMsg: page };
        });
      }
    };
    // ws.current.onclose = () => {};

    return () => {
      ws.current.close();
    };
  }, [channelId, user]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // Scroll
  useEffect(() => {
    // Does not work without setTimeout
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages?.currentMsgs.length]);

  return (
    <>
      <ChatWrapper className="conversation">
        <ChatHeader detailChannel={detailChannel} toggleInfo={toggleInfo} />
        <ChatView className="chat-view">
          <div className="blur-back"></div>
          <ChatViewContainer className="chat-view__container scroller">
            <ChatViewContent className="chat-view__content">
              {messages && <Conversations messages={messages} user={user} />}
              <div className="scrollSpacer" ref={scrollTargetRef}></div>
            </ChatViewContent>
          </ChatViewContainer>
          <ChatMsgTyping className="chat-msg__typing">Username is typing...</ChatMsgTyping>
        </ChatView>

        <ChatFooter scrollTargetRef={scrollTargetRef} channelId={channelId} ws={ws} />
      </ChatWrapper>
    </>
  );
});

export default Conversation;
