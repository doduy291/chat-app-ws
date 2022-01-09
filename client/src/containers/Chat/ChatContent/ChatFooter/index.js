import React, { useState, useRef, useCallback } from 'react';
import { AttachFile, Send, Mood, DeleteForever, InsertDriveFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

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

let convertedFiles = [];

const ChatFooter = React.memo(({ channelId, ws, scrollTargetRef }) => {
  console.count('Chat Footer');
  const dispatch = useDispatch();

  const [uploadedFiles, setUploadedFiles] = useState([]);
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
      scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendHandler = (e) => {
    e.preventDefault();
    const textMsg = textRef.current.innerText;
    if (textMsg.length > 0) {
      dispatch(postSendMessage({ channelId, textMsg, ws }));
      textRef.current.innerText = '';
    }
    if (uploadedFiles.length > 0) {
      sendFile(uploadedFiles);
    }
  };

  const sendFile = (uploadedFiles) => {
    console.log(uploadedFiles);
    let formData = new FormData();
    uploadedFiles.map((file) => formData.append('uploaded-files', file));
    formData.append('typeMsg', 'image');

    dispatch(postSendMessage({ channelId, formData, ws, typeMsg: 'image' }));

    setUploadedFiles([]);
    convertedFiles.splice(0, convertedFiles.length);
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
    e.preventDefault();
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 5000000) {
        // ~ 5mb
        setUploadedFiles([]);
        convertedFiles.splice(0, convertedFiles.length);
        setUploadedError(true);
        return;
      }
      convertedFiles.push({
        name: selectedFiles[i].name,
        type: selectedFiles[i].type,
        file: URL.createObjectURL(selectedFiles[i]),
      });
      setUploadedFiles((current) => {
        return [...current, selectedFiles[i]];
      });
      // selectedFiles[i] ~ selectedFiles.key ~ key have name is '0','1',...
      // ! NOT ELEMENT IN ARRAY
      // fileUploadInputRef.current.value = '';
    }
  };

  const removeFileHandler = (index) => (e) => {
    convertedFiles = convertedFiles.filter((_, i) => i !== index);
    setUploadedFiles((current) => [...current.filter((_, i) => i !== index)]);
  };

  return (
    <>
      <ChatFooterWrapper className="chat-footer">
        <ChatFooterContainer className="chat-footer__container">
          <input type="file" id="file-upload" multiple ref={fileUploadInputRef} onChange={fileSelectedHandler} />
          <TextareaWrapper>
            <ChatFooterTextarea className="chat-footer__textarea">
              {convertedFiles.length > 0 && (
                <FileWrapper className="file-wrapper">
                  <FileList className="file__list">
                    <FileItemBox>
                      {convertedFiles.map((item, i) => (
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
