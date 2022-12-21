import React, { useRef, useState } from 'react';
import { PeopleAlt, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import {
  ContactSidebar,
  SidebarTitle,
  SidebarSearch,
  SidebarList,
  SidebarItem,
  SidebarAddContact,
  AddButton,
} from './styles';
import { PersonAdd } from '@mui/icons-material';
import DialogAddContact from '../../../components/Dialog/AddContact';
import { debounce } from '../../../utils/helper';
import { useEffect } from 'react';

const Sidebar = React.memo(({ allContacts }) => {
  const [openDialogAddContact, setOpenDialogAddContact] = useState(false);
  const [contacts, setContacts] = useState();
  const inputRef = useRef();
  const typingTimeoutRef = useRef();

  const openDialogHandler = () => {
    setOpenDialogAddContact(true);
  };

  const searchContactHandler = () => {
    const searchContacts = () => {
      const keyword = inputRef.current.value;
      const filteredContact = allContacts?.filter((contact) => contact.username.match(keyword));
      setContacts(filteredContact);
    };
    debounce(searchContacts, 500, typingTimeoutRef);
  };

  useEffect(() => {
    setContacts(allContacts);
  }, [allContacts]);

  return (
    <>
      <ContactSidebar className="contact-sidebar">
        <SidebarTitle className="contact-sidebar__title">
          Contacts
          <PeopleAlt />
          <div className="count">{contacts?.length}</div>
        </SidebarTitle>
        <SidebarSearch className="contact-sidebar__search">
          <input type="text" placeholder="Search contact" ref={inputRef} onChange={searchContactHandler} />
          <Search />
        </SidebarSearch>
        <SidebarAddContact className="contact-sidebar__add-contact">
          <AddButton onClick={openDialogHandler}>
            <span>Add Contact</span>
            <PersonAdd />
          </AddButton>
        </SidebarAddContact>
        <SidebarList className="contact-sidebar__list">
          {contacts?.map((element, i) => (
            <SidebarItem className="contact-sidebar__item" key={i} to={`/channel/${element.channelId}`}>
              <Avatar />
              <span>{element.username}</span>
            </SidebarItem>
          ))}
        </SidebarList>
      </ContactSidebar>

      {openDialogAddContact && (
        <DialogAddContact open={openDialogAddContact} setOpenDialogAddContact={setOpenDialogAddContact} />
      )}
    </>
  );
});

export default Sidebar;
