import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const Sidebar = React.memo(({ allContacts, user }) => {
  const [openDialogAddContact, setOpenDialogAddContact] = useState(false);

  const openDialogHandler = () => {
    setOpenDialogAddContact(true);
  };

  return (
    <>
      <ContactSidebar className="contact-sidebar">
        <SidebarTitle className="contact-sidebar__title">
          Contacts
          <PeopleAlt />
          <div className="count">{allContacts?.contacts.length}</div>
        </SidebarTitle>
        <SidebarSearch className="contact-sidebar__search">
          <input type="text" placeholder="Search contact" />
          <Search />
        </SidebarSearch>
        <SidebarAddContact className="contact-sidebar__add-contact">
          <AddButton onClick={openDialogHandler}>
            <span>Add Contact</span>
            <PersonAdd />
          </AddButton>
        </SidebarAddContact>
        <SidebarList className="contact-sidebar__list">
          {allContacts?.contacts.map((element, i) => (
            <SidebarItem
              className="contact-sidebar__item"
              key={i}
              to={filteredContactChannel(element._id, user._id, allContacts)}
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
