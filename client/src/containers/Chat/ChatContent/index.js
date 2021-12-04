import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AvatarGroup, Avatar } from '@mui/material';

import { Info, MoreVert, Settings, Mood, AttachFile, Send } from '@mui/icons-material';
import { ChatWrapper, ChatHeader, HeaderLeft, HeaderRight, ChatView, ChatViewContainer, ChatFooter } from './styles';

const ChatContent = ({ setShowSidebarInfo, channelId }) => {
  const { detailChannel } = useSelector((state) => state.channel);

  useEffect(() => {
    // Disable pressing Enter to go down a line
    let textarea = document.querySelector('.textarea__custom');
    textarea.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && !e.shiftKey) e.preventDefault();
    });
  }, []);

  return (
    <>
      <ChatWrapper>
        <ChatHeader className="chat-header overlap-top">
          <HeaderLeft className="chat-header__left">
            <div className="chat-header__title">
              {detailChannel.channelType === 'direct' ? detailChannel.members[0].username : detailChannel.channelName}
            </div>
            {detailChannel.channelType === 'group' ? (
              <>
                <div className="dot"></div>
                <div className="chat-header__member-count">
                  <AvatarGroup max={3}>
                    {detailChannel.members.map((element, i) => (
                      <Avatar className="chat-header__avatar" key={i} />
                    ))}
                  </AvatarGroup>
                  <span>+{detailChannel.members.filter((element) => element.active === 'online').length} Online</span>
                </div>
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
            <div className="chat-view__content">
              <div className="chat-msg chat-msg--you">
                <span className="chat-msg__text chat-msg__text--you">
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
                </span>
              </div>
              <div className="chat-msg__timestamp chat-msg__timestamp--you">
                Username <span className="datetime">3:35pm</span>
              </div>

              <div className="chat-msg ">
                <span className="chat-msg__text ">
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
                </span>
              </div>
              <div className="chat-msg ">
                <span className="chat-msg__text">Test</span>
              </div>
              <div className="chat-msg__timestamp">
                <Avatar className="chat-msg__avatar" /> Username <span className="datetime">3:35pm</span>
              </div>
              <div className="chat-msg__typing">Username is typing...</div>
            </div>
          </ChatViewContainer>
        </ChatView>
        <ChatFooter className="chat-footer">
          <div className="chat-footer__container">
            <div className="chat-footer__textarea">
              <div className="textarea">
                <div className="textarea__custom" role="textbox" contentEditable="true" aria-multiline="true"></div>
              </div>
              <div className="textarea-buttons">
                <AttachFile />
                <Mood />
              </div>
            </div>

            <div className="chat-footer__send">
              <Send />
              <span>Send</span>
            </div>
          </div>
        </ChatFooter>
      </ChatWrapper>
    </>
  );
};

export default ChatContent;
