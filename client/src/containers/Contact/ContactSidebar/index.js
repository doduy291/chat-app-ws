import React from 'react';
import { PeopleAlt, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { ContactSidebar, SidebarTitle, SidebarSearch, SidebarList, SidebarItem } from './styles';

import GlobalLoading from '../../../components/UI/GlobalLoading';

const Sidebar = ({ isLoading, contacts }) => {
  return (
    <ContactSidebar className="contact-sidebar">
      <SidebarTitle className="contact-sidebar__title">
        Contacts
        <PeopleAlt />
        <div className="count">{contacts?.length}</div>
      </SidebarTitle>
      <SidebarSearch className="contact-sidebar__search">
        <input type="text" placeholder="Search contact" />
        <Search />
      </SidebarSearch>
      <SidebarList className="contact-sidebar__list">
        {isLoading ? (
          <GlobalLoading />
        ) : (
          contacts.map((element, i) => (
            <SidebarItem className="contact-sidebar__item" key={i}>
              <Avatar />
              <span>{element.username}</span>
            </SidebarItem>
          ))
        )}
      </SidebarList>
    </ContactSidebar>
  );
};

export default Sidebar;
