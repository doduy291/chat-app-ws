import React, { useEffect, useState, useRef } from 'react';
import { AttachFile, Send, Mood } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import EmojiPicker from '../../../../components/EmojiPicker';
import {
  ChatFooterWrapper,
  ChatFooterContainer,
  ChatFooterTextarea,
  ChatFooterSend,
  ChatFooterButton,
  TextareaContainer,
  TextareaWrapper,
  TextareaTyping,
  TextareaCustom,
  TextareaButtons,
  FileList,
  FileItem,
  FileItemContainer,
  FileUploadContainer,
} from './styles';

import { postSendMessage } from '../../../../redux/actions/message.action';

const ChatFooter = React.memo(({ channelId, ws, scrollTargetRef }) => {
  console.count('Chat Footer');

  const dispatch = useDispatch();

  const [fileOpen, setFileOpen] = useState(true);
  const emojiPickerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // let textareaContainer = document.querySelector('.textarea__container');
    // let fileList = document.querySelector('.file-list');
    // const changeWidth = (e) => {
    //   // fileList.style.width = `${textareaContainer.offsetWidth}px`;
    //   console.log(textareaContainer.offsetWidth);
    // };
    // window.addEventListener('resize', changeWidth);
    // return () => window.removeEventListener('resize', changeWidth);
  }, []);

  // Disable pressing Enter to go down a line
  const checkKeyCode = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && e.shiftKey) {
      console.log('Insert a line');
      console.log(textRef.current.offsetHeight);
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendHandler = (e) => {
    e.preventDefault();
    if (textRef.current.innerText.length === 0) {
      return false;
    }
    const textMsg = textRef.current.innerText;
    dispatch(postSendMessage({ channelId, textMsg, typeMsg: 'text', ws }));
    textRef.current.innerText = '';
  };

  const emojiOpenHandler = (e) => {
    emojiPickerRef.current.classList.toggle('visible');
  };

  const addEmojiToTextarea = (native) => {
    const textMsg = textRef.current.innerText.trim() + native;
    textRef.current.innerText = textMsg;
  };

  return (
    <ChatFooterWrapper className="chat-footer">
      <ChatFooterContainer className="chat-footer__container">
        <TextareaWrapper>
          <ChatFooterTextarea className="chat-footer__textarea">
            {fileOpen && (
              <FileUploadContainer>
                <FileList className="file-list">
                  <FileItemContainer className="file-item-container">
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                    <FileItem></FileItem>
                  </FileItemContainer>
                </FileList>
              </FileUploadContainer>
            )}
            <TextareaContainer className="textarea__container">
              <TextareaTyping className="textarea__typing">
                <TextareaCustom
                  className="textarea__custom"
                  role="textbox"
                  contentEditable="true"
                  aria-multiline="true"
                  suppressContentEditableWarning={true}
                  onKeyUp={checkKeyCode}
                  ref={textRef}
                ></TextareaCustom>
              </TextareaTyping>
              <TextareaButtons className="textarea__buttons">
                <AttachFile />
                <Mood className="emoji-picker-icon" onClick={emojiOpenHandler} />
              </TextareaButtons>
            </TextareaContainer>
          </ChatFooterTextarea>
          <EmojiPicker emojiPickerRef={emojiPickerRef} addEmojiToTextarea={addEmojiToTextarea} />
        </TextareaWrapper>

        <ChatFooterSend className="chat-footer__send">
          <ChatFooterButton className="chat-footer__button" onClick={sendHandler}>
            <Send />
            <span>Send</span>
          </ChatFooterButton>
        </ChatFooterSend>
      </ChatFooterContainer>
    </ChatFooterWrapper>
  );
});

export default ChatFooter;
