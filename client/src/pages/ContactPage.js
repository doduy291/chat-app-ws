import React from 'react';
import { useSelector } from 'react-redux';
import { ContactWrapper } from '../containers/Contact/styles';

import ContactSidebar from '../containers/Contact/ContactSidebar';
import ContactTabs from '../containers/Contact/ContactTabs';
import { useGetAllContacts } from '../services/contact.api';

const ContactPage = () => {
  const { user } = useSelector((state) => state.user);
  const { data: allContactsData } = useGetAllContacts();

  return (
    <ContactWrapper>
      <ContactSidebar allContacts={allContactsData} user={user} />
      <ContactTabs allContacts={allContactsData} user={user} />
    </ContactWrapper>
  );
};

export default ContactPage;
