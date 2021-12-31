import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { Picker } from 'emoji-mart';
import { EmojiPickerContainer } from './styles';

const EmojiPicker = ({ emojiOpen, addEmojiToTextarea }) => {
  return (
    <>
      <EmojiPickerContainer emojiOpen={emojiOpen}>
        <Picker set="google" sheetSize={64} onSelect={(e) => addEmojiToTextarea(e.native)} />
      </EmojiPickerContainer>
    </>
  );
};

export default EmojiPicker;
