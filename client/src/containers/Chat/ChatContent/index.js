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
  ChatMsgTimestamp,
  ChatMsgText,
  ChatMsgTyping,
  ChatFooterContainer,
  ChatFooterTextarea,
  ChatFooterSend,
  Textarea,
  TextareaCustom,
  TextareaButtons,
} from './styles';

const ChatContent = ({ setShowSidebarInfo }) => {
  const { detailChannel } = useSelector((state) => state.channel);
  const ws = useRef();
  useEffect(() => {
    // Disable pressing Enter to go down a line
    let textarea = document.querySelector('.textarea__custom');
    textarea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && !e.shiftKey) e.preventDefault();
    });
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
        : process.env.REACT_APP_API_SOCKEt_URL
    );
    ws.current.onopen = () => {
      console.log('Connected WebSocket from Server ✅');
    };
    ws.current.onmessage = (message) => {
      console.log(`New message: ${message.data}`);
    };
    ws.current.onclose = () => {
      console.log('Disconnected WebSocket from Server ❌');
    };
    setTimeout(() => {
      ws.current.send(JSON.stringify({ message: 'Helloooooooooo server' }));
    }, 2000);
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
            <Info onClick={() => setShowSidebarInfo(true)} />
            <MoreVert />
            <Settings />
          </HeaderRight>
        </ChatHeader>

        <ChatView className="chat-view">
          <div className="blur-back"></div>
          <ChatViewContainer className="chat-view__container scroller">
            <ChatViewContent className="chat-view__content">
              <ChatMsg className="chat-msg chat-msg--you">
                <ChatMsgText className="chat-msg__text chat-msg__text--you">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio accusamus veritatis nobis optio Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ea debitis blanditiis quam. Dolorem
                  impedit officia, nisi eum quas sunt et expedita doloribus iste a nobis, consequatur esse vitae odit!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In veniam corporis aut nulla officiis eos
                  vitae nostrum, atque at voluptates provident, fugiat quasi magni doloremque, veritatis cumque fugit
                  vel explicabo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, voluptate placeat ut
                  minus vitae officiis, similique blanditiis quisquam id praesentium temporibus eos ex ab repudiandae
                  magnam consequuntur dolor vel unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
                  ducimus repudiandae. Beatae sequi iusto saepe tempore ipsam repellat veritatis quis optio illo laborum
                  quasi possimus, id quidem minus consectetur ipsa? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Architecto, distinctio necessitatibus consequatur omnis at voluptas dolor ratione, laudantium,
                  quibusdam id perferendis asperiores veniam. Doloribus beatae nesciunt repellat culpa ullam aspernatur!
                </ChatMsgText>
              </ChatMsg>
              <ChatMsgTimestamp className="chat-msg__timestamp chat-msg__timestamp--you">
                Username <span className="datetime">3:35pm</span>
              </ChatMsgTimestamp>

              <ChatMsg className="chat-msg ">
                <ChatMsgText className="chat-msg__text ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio accusamus veritatis nobis optio Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ea debitis blanditiis quam. Dolorem
                  impedit officia, nisi eum quas sunt et expedita doloribus iste a nobis, consequatur esse vitae odit!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In veniam corporis aut nulla officiis eos
                  vitae nostrum, atque at voluptates provident, fugiat quasi magni doloremque, veritatis cumque fugit
                  vel explicabo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, voluptate placeat ut
                  minus vitae officiis, similique blanditiis quisquam id praesentium temporibus eos ex ab repudiandae
                  magnam consequuntur dolor vel unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
                  ducimus repudiandae. Beatae sequi iusto saepe tempore ipsam repellat veritatis quis optio illo laborum
                  quasi possimus, id quidem minus consectetur ipsa? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Architecto, distinctio necessitatibus consequatur omnis at voluptas dolor ratione, laudantium,
                  quibusdam id perferendis asperiores veniam. Doloribus beatae nesciunt repellat culpa ullam aspernatur!
                </ChatMsgText>
              </ChatMsg>
              <ChatMsg className="chat-msg ">
                <ChatMsgText className="chat-msg__text">Test</ChatMsgText>
              </ChatMsg>
              <ChatMsgTimestamp className="chat-msg__timestamp">
                <Avatar className="chat-msg__avatar" /> Username <span className="datetime">3:35pm</span>
              </ChatMsgTimestamp>
              <ChatMsgTyping className="chat-msg__typing">Username is typing...</ChatMsgTyping>
            </ChatViewContent>
          </ChatViewContainer>
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
