import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';

import { ChatMsgTimestamp, ChatMsgText, ChatMsg, ChatMsgFile } from './styles';
import { formatToMsTime, formatToTime } from '../../../../utils/format';
import { imgOptimize } from '../../../../utils/cloudinaryImgOptimize';
import ModalImage from '../../../../components/UI/Modal/Image';

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

  const imgModalHandler = (fileUrl, fileContentType) => (e) => {
    setImgUrl({ fileUrl, fileContentType });
    setModalImg(true);
  };

  return (
    <>
      {newFilterdMsgs.map((msg, i) => (
        <div className="msg-wrapper" key={i}>
          {msg.text && (
            <ChatMsg className={`chat-msg ${user._id === msg.userId._id ? 'chat-msg--you' : ''}`}>
              <ChatMsgText className={`chat-msg__text ${user._id === msg.userId._id ? 'chat-msg__text--you' : ''}`}>
                {msg.text}
              </ChatMsgText>
            </ChatMsg>
          )}
          {msg.messageType === 'file' &&
            msg.files.map((file, j) => (
              <ChatMsg className={`chat-msg ${user._id === msg.userId._id ? 'chat-msg--you' : ''}`} key={j}>
                {file.contentType.split('/')[0] === 'image' && (
                  <ChatMsgText
                    style={{ padding: '0' }}
                    className={`chat-msg__text ${user._id === msg.userId._id ? 'chat-msg__text--you' : ''}`}
                  >
                    <img
                      src={imgOptimize(file.url, file.contentType, file.width, file.height)}
                      alt="img"
                      onClick={imgModalHandler(file.url, file.contentType)}
                    />
                  </ChatMsgText>
                )}
                {file.contentType.split('/')[0] === 'application' && (
                  <ChatMsgText className={`chat-msg__text ${user._id === msg.userId._id ? 'chat-msg__text--you' : ''}`}>
                    <ChatMsgFile href={file.url} target="_blank">
                      <InsertDriveFile />
                      {file.filename}
                    </ChatMsgFile>
                  </ChatMsgText>
                )}
              </ChatMsg>
            ))}
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
