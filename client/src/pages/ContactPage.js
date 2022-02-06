import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ContactWrapper } from '../containers/Contact/styles';

import ContactSidebar from '../containers/Contact/ContactSidebar';
import ContactTabs from '../containers/Contact/ContactTabs';
import contactService from '../services/contact.api';
import useWebsocket from '../hooks/useWebsocket';

const ContactPage = () => {
  const { user } = useSelector((state) => state.user);
  const { data: allContactsData } = contactService.useGetAllContacts();

  const [allContacts, setAllContacts] = useState(null);

  const useWS = useWebsocket(null, user, setAllContacts, 'contact-connection');

  useEffect(() => {
    setAllContacts(allContactsData);
  }, [allContactsData]);

  return (
    <ContactWrapper>
      <ContactSidebar allContacts={allContacts} setAllContacts={setAllContacts} user={user} />
      <ContactTabs allContacts={allContacts} user={user} useWS={useWS} />
    </ContactWrapper>
  );
};

export default ContactPage;
