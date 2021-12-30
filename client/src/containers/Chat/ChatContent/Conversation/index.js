import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  ChatMsgTyping,
  ChatFooterContainer,
  ChatFooterTextarea,
  ChatFooterSend,
  Textarea,
  TextareaCustom,
  TextareaButtons,
} from './styles';
import { renderConversations } from './conversations';
import { fetchGetMessageChannel } from '../../../../api/message.api';
import { postSendMessage } from '../../../../redux/actions/message.action';

const Conversation = ({ toggleInfo, channelId, detailChannel }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({});
  const textRef = useRef();
  const ws = useRef();
  const scrollTarget = useRef(null);

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
      console.log(res);
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

  useEffect(() => {
    // Disable pressing Enter to go down a line
    let textarea = document.querySelector('.textarea__custom');
    textarea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && !e.shiftKey) e.preventDefault();
    });
  }, []);

  // Fetch
  useEffect(() => {
    if (channelId) {
      fetchGetMessageChannel({ channelId, setMessages });
    }
  }, [channelId]);

  // Scroll
  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages?.currentMsgs?.length]);

  const sendHandler = (e) => {
    e.preventDefault();
    const textMsg = textRef.current.innerText;
    dispatch(postSendMessage({ channelId, textMsg, typeMsg: 'text', ws }));
    textRef.current.innerText = '';
  };

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
              {messages && renderConversations(messages, user)}
              <div className="scrollSpacer" ref={scrollTarget}></div>
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
                  ref={textRef}
                ></TextareaCustom>
              </Textarea>
              <TextareaButtons className="textarea-buttons">
                <AttachFile />
                <Mood />
              </TextareaButtons>
            </ChatFooterTextarea>

            <ChatFooterSend className="chat-footer__send" onClick={sendHandler}>
              <Send />
              <span>Send</span>
            </ChatFooterSend>
          </ChatFooterContainer>
        </ChatFooter>
      </ChatWrapper>
    </>
  );
};

export default Conversation;
