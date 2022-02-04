import React, { useState, useRef, useCallback } from 'react';
import { Tooltip } from '@mui/material';
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
import DialogError from '../../../../components/Dialog/Error';
import { checkFile } from '../../../../validation/checkFile.validation';

let previewedFiles = [];

const ChatFooter = ({ channelId, useWS, scrollTargetRef }) => {
  const dispatch = useDispatch();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedError, setUploadedError] = useState({ error: false, errorMsg: '' });

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
    let formData = new FormData();

    if (!textMsg && uploadedFiles.length === 0) {
      return;
    }
    if (textMsg) {
      formData.append('textMsg', textMsg);
    }
    if (uploadedFiles.length > 0) {
      uploadedFiles.map((file) => formData.append('uploaded-files', file));
    }

    dispatch(postSendMessage({ channelId, formData, useWS }));

    // Clean
    if (textMsg) {
      textRef.current.innerText = '';
    }
    if (uploadedFiles.length > 0) {
      previewedFiles.splice(0, previewedFiles.length);
      setUploadedFiles([]);
    }
  };

  const emojiOpenHandler = (e) => {
    emojiPickerRef.current.classList.toggle('visible');
  };

  const addEmojiToTextarea = useCallback((native) => {
    const textMsg = textRef.current.innerText.trim() + native;
    textRef.current.innerText = textMsg;
  }, []);

  // ** Upload File **//
  const clickOpenFileHandler = (e) => {
    e.preventDefault();
    fileUploadInputRef.current.click();
  };

  // Display previewed file
  const fileSelectedHandler = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    console.log(selectedFiles);

    for (let i = 0; i < selectedFiles.length; i++) {
      if (!checkFile(selectedFiles[i].name, selectedFiles[i].size).correct) {
        setUploadedFiles([]);
        previewedFiles.splice(0, previewedFiles.length);
        setUploadedError({ error: true, errorMsg: checkFile(selectedFiles[i].name, selectedFiles[i].size).msg });
        return;
      }
      previewedFiles.push({
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

  // Remove file from array
  const removeFileHandler = (index) => (e) => {
    previewedFiles = previewedFiles.filter((_, i) => i !== index);
    setUploadedFiles((current) => [...current.filter((_, i) => i !== index)]);
  };

  return (
    <>
      <ChatFooterWrapper className="chat-footer">
        <ChatFooterContainer className="chat-footer__container">
          <input type="file" id="file-upload" multiple ref={fileUploadInputRef} onChange={fileSelectedHandler} />
          <TextareaWrapper>
            <ChatFooterTextarea className="chat-footer__textarea">
              {previewedFiles.length > 0 && (
                <FileWrapper className="file-wrapper">
                  <FileList className="file__list">
                    <FileItemBox>
                      {previewedFiles.map((item, i) => (
                        <FileItem className="file__item" key={i}>
                          {item.type.split('/')[0] === 'image' ? (
                            <FileItemDisplay>
                              <img src={item.file} alt="" />
                            </FileItemDisplay>
                          ) : (
                            <FileItemDisplay>
                              <InsertDriveFile />
                            </FileItemDisplay>
                          )}
                          <Tooltip title={item.name}>
                            <FileItemName>{item.name}</FileItemName>
                          </Tooltip>
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

      {uploadedError.error && (
        <DialogError open={uploadedError.error} setUploadedError={setUploadedError}>
          {uploadedError.errorMsg}
        </DialogError>
      )}
    </>
  );
};

export default ChatFooter;
