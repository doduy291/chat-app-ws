import React from 'react';
import { Checkbox } from '@mui/material';
import {
  ListFriendWrapper,
  ListFriendBox,
  ListFriendItem,
  ListFriendAvatar,
  ListFriendName,
  ListFriendCheckbox,
} from '../styles';

const ListFriend = React.memo(({ contacts, addMultiSelectHandler, selectedUsers }) => {
  console.log('list friend');

  return (
    <>
      <ListFriendWrapper>
        <ListFriendBox>
          {contacts.map((contact, i) => (
            <ListFriendItem
              key={i}
              onClick={addMultiSelectHandler({ contactId: contact._id, contactName: contact.username })}
              className="listfriend__item"
            >
              <ListFriendAvatar className="listfriend__avatar" />
              <ListFriendName className="listfriend__name">{contact.username}</ListFriendName>
              <ListFriendCheckbox className="listfriend__checkbox">
                <Checkbox
                  className="checkbox-icon"
                  disableRipple={true}
                  checked={selectedUsers.some((user) => user['contactId'] === contact._id)}
                />
              </ListFriendCheckbox>
            </ListFriendItem>
          ))}
        </ListFriendBox>
      </ListFriendWrapper>
    </>
  );
});

export default ListFriend;
