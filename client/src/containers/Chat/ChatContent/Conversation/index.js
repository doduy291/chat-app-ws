import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ChatFooter from '../ChatFooter';
import ChatHeader from '../ChatHeader';
import { ChatWrapper, ChatView, ChatViewContainer, ChatViewContent, ChatMsgTyping } from './styles';

import { renderConversations } from './data-conversations';
import { fetchGetMessageChannel } from '../../../../api/message.api';

const Conversation = React.memo(({ toggleInfo, channelId, detailChannel }) => {
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState({});

  const ws = useRef();
  const scrollTargetRef = useRef(null);

  console.count('Conversation');

  // Websocket Connection
  useEffect(() => {
    ws.current = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
        : process.env.REACT_APP_API_SOCKET_URL
    );

    ws.current.onopen = () => {
      console.log('Connected WebSocket from Server ✅');
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
    ws.current.onclose = () => {
      console.log('Disconnected WebSocket from Server ❌');
    };

    return () => {
      console.log('Cleaning up! 🧼');
      ws.current.close();
    };
  }, [channelId, user]);

  // Fetch
  useEffect(() => {
    if (channelId) {
      fetchGetMessageChannel({ channelId, setMessages });
    }
  }, [channelId]);

  // Scroll
  useEffect(() => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages?.currentMsgs?.length]);

  return (
    <>
      <ChatWrapper className="conversation">
        <ChatHeader detailChannel={detailChannel} toggleInfo={toggleInfo} />
        <ChatView className="chat-view">
          <div className="blur-back"></div>
          <ChatViewContainer className="chat-view__container scroller">
            <ChatViewContent className="chat-view__content">
              {messages && renderConversations(messages, user)}
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
