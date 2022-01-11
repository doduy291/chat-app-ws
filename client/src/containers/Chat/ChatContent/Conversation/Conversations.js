import React, { useState } from 'react';
import { Avatar } from '@mui/material';

import { ChatMsgTimestamp, ChatMsgText, ChatMsg } from './styles';
import { formatToMsTime, formatToTime } from '../../../../utils/timeFormat';
import { imgOptimize } from '../../../../utils/cloudinaryImgOptimize';
import ModalImage from '../../../../components/UI/ModalImage';

const Conversations = ({ messages, user }) => {
  const [modalImg, setModalImg] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const tsMsgs = (messages) => {
    let msgContainer = [];

    messages?.currentMsgs?.forEach((msg, i, array) => {
      const cloneMsg = Object.assign({}, msg);
      const currentMsgUser = msg.userId._id;
      const previousMsgUser = array[i - 1]?.userId._id || '';
      const currentMsTime = formatToMsTime(msg.createdAt);
      const previousMsTime = formatToMsTime(array[i - 1]?.createdAt);

      if (currentMsgUser !== previousMsgUser) {
        cloneMsg.ts = true;
        msgContainer.push(cloneMsg);
      }
      if (currentMsgUser === previousMsgUser) {
        // currentTime and previousTime are not nearby
        if (currentMsTime >= previousMsTime + 5 * 60 * 1000) {
          cloneMsg.ts = true;
          msgContainer.push(cloneMsg);
        }
        // currentTime and previousTime near each other
        if (currentMsTime < previousMsTime + 5 * 60 * 1000) {
          cloneMsg.ts = true;
          msgContainer.push(cloneMsg);
          msgContainer[i - 1].ts = false;
        }
      }
    });
    return msgContainer;
  };

  const newFilterdMsgs = tsMsgs(messages);

  const imgModalHandler = (fileUrl) => (e) => {
    setImgUrl(fileUrl);
    setModalImg(true);
  };

  return (
    <>
      {newFilterdMsgs.map((msg, i) => (
        <div className="msg-wrapper" key={i}>
          <ChatMsg className={`chat-msg ${user._id === msg.userId._id ? 'chat-msg--you' : ''}`}>
            {msg.messageType === 'text' && (
              <ChatMsgText className={`chat-msg__text' ${user._id === msg.userId._id ? 'chat-msg__text--you' : ''}`}>
                {msg.text}
              </ChatMsgText>
            )}
            {msg.messageType === 'image' &&
              msg.files.map((file, j) => (
                <ChatMsgText
                  key={j}
                  style={{ padding: '0' }}
                  className={`chat-msg__text' ${user._id === msg.userId._id ? 'chat-msg__text--you' : ''}`}
                >
                  <img
                    src={imgOptimize(file.url, file.width, file.height)}
                    alt="img"
                    onClick={imgModalHandler(file.url)}
                  />
                </ChatMsgText>
              ))}
          </ChatMsg>
          {msg.ts && (
            <div className="ts-wrapper">
              <ChatMsgTimestamp
                className={`chat-msg__timestamp ${user._id === msg.userId._id ? 'chat-msg__timestamp--you' : ''}`}
              >
                {!msg.yourMsg && <Avatar className="chat-msg__avatar" />} {msg.userId.username}
                <span className="datetime">{formatToTime(msg.createdAt)}</span>
              </ChatMsgTimestamp>
            </div>
          )}
        </div>
      ))}
      {modalImg && <ModalImage modalImg={modalImg} setModalImg={setModalImg} imgUrl={imgUrl} />}
    </>
  );
};

export default Conversations;
