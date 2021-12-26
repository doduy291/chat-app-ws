import React, { useEffect, useState } from 'react';

import { ContactWrapper } from '../containers/Contact/styles';

import ContactSidebar from '../containers/Contact/ContactSidebar';
import ContactTabs from '../containers/Contact/ContactTabs';
import { fetchGetAllContacts } from '../api/contact.api';

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchGetAllContacts(setContacts);
    return () => {};
  }, []);

  return (
    <ContactWrapper>
      <ContactSidebar contacts={contacts} />
      <ContactTabs contacts={contacts} />
    </ContactWrapper>
  );
};

export default ContactPage;
