import React, { useEffect, useCallback } from 'react';
import { Picker } from 'emoji-mart';
import { EmojiPickerContainer } from './styles';
import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = React.memo(({ emojiPickerRef, addEmojiToTextarea }) => {
  console.count('Emoji Picker');

  const emojiCloseHandler = useCallback(
    (e) => {
      let emojiPickerIcon = document.querySelector('.emoji-picker-icon');
      if (!emojiPickerRef?.current?.contains(e.target)) {
        if (e.target.contains(emojiPickerIcon)) {
          return;
        }
        emojiPickerRef.current.classList.remove('visible');
      }
    },
    [emojiPickerRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', emojiCloseHandler);
    return () => document.removeEventListener('mousedown', emojiCloseHandler);
  }, [emojiCloseHandler]);

  return (
    <>
      <EmojiPickerContainer className="emoji-picker" ref={emojiPickerRef}>
        <Picker set="google" sheetSize={64} onSelect={(e) => addEmojiToTextarea(e.native)} />
      </EmojiPickerContainer>
    </>
  );
});

export default EmojiPicker;
