import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContactWrapper } from '../containers/Contact/styles';

import ContactSidebar from '../containers/Contact/ContactSidebar';
import ContactTabs from '../containers/Contact/ContactTabs';
import { fetchGetAllContacts } from '../api/contact.api';

const ContactPage = () => {
  const { user } = useSelector((state) => state.user);
  const [allContacts, setAllContacts] = useState();
  useEffect(() => {
    fetchGetAllContacts(setAllContacts);
    return () => {};
  }, []);

  return (
    <ContactWrapper>
      <ContactSidebar allContacts={allContacts} user={user} />
      <ContactTabs allContacts={allContacts} user={user} />
    </ContactWrapper>
  );
};

export default ContactPage;
