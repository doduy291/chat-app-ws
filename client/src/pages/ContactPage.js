import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContactWrapper } from '../containers/Contact/styles';
import { getAllContacts } from '../redux/actions/contact.action';

import ContactSidebar from '../containers/Contact/ContactSidebar';
import ContactTabs from '../containers/Contact/ContactTabs';

const ContactPage = () => {
  const { isLoading, contacts } = useSelector((state) => state.contact);
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllContacts());
    return () => {};
  }, [dispatch]);
  return (
    <ContactWrapper>
      <ContactSidebar contacts={contacts} isLoading={isLoading} />
      <ContactTabs value={value} handleChange={handleChange} contacts={contacts} isLoading={isLoading} />
    </ContactWrapper>
  );
};

export default ContactPage;
