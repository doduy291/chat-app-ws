import React, { useState, useRef, useCallback } from 'react';
import { AttachFile, Send, Mood, DeleteForever, InsertDriveFile } from '@mui/icons-material';
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
  FileItemBox,
  FileWrapper,
  FileItem,
  FileItemName,
  FileItemDisplay,
  ActionBar,
} from './styles';

import { postSendMessage } from '../../../../redux/actions/message.action';
import ModalError from '../../../../components/UI/ModalError';
import { fileTypes } from '../../../../utils/constants';

const ChatFooter = React.memo(({ channelId, ws, scrollTargetRef }) => {
  console.count('Chat Footer');
  const dispatch = useDispatch();

  const [uploadedFile, setUploadedFile] = useState([]);
  const [uploadedError, setUploadedError] = useState(false);

  const emojiPickerRef = useRef();
  const fileUploadInputRef = useRef();
  const textRef = useRef();

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

  const addEmojiToTextarea = useCallback((native) => {
    const textMsg = textRef.current.innerText.trim() + native;
    textRef.current.innerText = textMsg;
  }, []);

  const clickOpenFileHandler = (e) => {
    e.preventDefault();
    fileUploadInputRef.current.click();
  };

  const fileSelectedHandler = (e) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 5000000) {
        // ~ 5mb
        setUploadedFile([]);
        setUploadedError(true);
        return;
      }
      setUploadedFile((current) => [
        ...current,
        {
          name: selectedFiles[i].name,
          size: selectedFiles[i].size,
          type: selectedFiles[i].type,
          file: URL.createObjectURL(selectedFiles[i]),
        },
      ]);
      //selectedFiles[i] ~ selectedFiles.key ~ key have name is '0','1',...
      //! NOT ELEMENT IN ARRAY
    }
  };

  const removeFileHandler = (index) => (e) => {
    setUploadedFile((current) => [...current.filter((_, i) => i !== index)]);
  };

  return (
    <>
      <ChatFooterWrapper className="chat-footer">
        <ChatFooterContainer className="chat-footer__container">
          <input
            type="file"
            id="file-upload"
            multiple
            style={{ width: '0px', height: '0px' }}
            ref={fileUploadInputRef}
            onChange={fileSelectedHandler}
          />
          <TextareaWrapper>
            <ChatFooterTextarea className="chat-footer__textarea">
              {uploadedFile.length > 0 && (
                <FileWrapper className="file-wrapper">
                  <FileList className="file__list">
                    <FileItemBox>
                      {uploadedFile.map((item, i) => (
                        <FileItem className="file__item" key={i}>
                          {fileTypes.includes(item.type.split('/')[1]) ? (
                            <FileItemDisplay>
                              <img src={item.file} alt="" />
                            </FileItemDisplay>
                          ) : (
                            <FileItemDisplay>
                              <InsertDriveFile />
                            </FileItemDisplay>
                          )}
                          <FileItemName>{item.name}</FileItemName>
                          <ActionBar className="action-bar">
                            <DeleteForever className="action-bar__remove" onClick={removeFileHandler(i)} />
                          </ActionBar>
                        </FileItem>
                      ))}
                    </FileItemBox>
                  </FileList>
                </FileWrapper>
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
                  <AttachFile onClick={clickOpenFileHandler} />
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

      {uploadedError && <ModalError open={uploadedError} setUploadedError={setUploadedError} />}
    </>
  );
});

export default ChatFooter;
