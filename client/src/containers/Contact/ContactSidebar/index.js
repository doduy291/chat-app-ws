import React, { useState, useRef } from 'react';
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
import { filteredContactChannel } from '../data';
import { debounce } from '../../../utils/helper';

const Sidebar = React.memo(({ allContacts, user, setAllContacts }) => {
  const [openDialogAddContact, setOpenDialogAddContact] = useState(false);
  const searchContactRef = useRef();
  const openDialogHandler = () => {
    setOpenDialogAddContact(true);
  };
  const searchKeyUp = () => {
    const keyword = searchContactRef.current.value;
    const searchContacts = () => {
      const filteredContact = allContacts?.contacts?.filter((contact) => contact.username.match(keyword));
      console.log(filteredContact);
      setAllContacts(filteredContact);
    };
    debounce(500, searchContacts());
  };

  return (
    <>
      <ContactSidebar className="contact-sidebar">
        <SidebarTitle className="contact-sidebar__title">
          Contacts
          <PeopleAlt />
          <div className="count">{allContacts?.contacts?.length}</div>
        </SidebarTitle>
        <SidebarSearch className="contact-sidebar__search">
          <input type="text" placeholder="Search contact" ref={searchContactRef} onKeyUp={searchKeyUp} />
          <Search />
        </SidebarSearch>
        <SidebarAddContact className="contact-sidebar__add-contact">
          <AddButton onClick={openDialogHandler}>
            <span>Add Contact</span>
            <PersonAdd />
          </AddButton>
        </SidebarAddContact>
        <SidebarList className="contact-sidebar__list">
          {allContacts?.contacts?.map((element, i) => (
            <SidebarItem
              className="contact-sidebar__item"
              key={i}
              to={filteredContactChannel(element._id, user._id, allContacts?.chatChannels)}
            >
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
