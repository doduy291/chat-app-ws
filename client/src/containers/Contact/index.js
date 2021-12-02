import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Avatar } from '@mui/material';
import { PeopleAlt, Search } from '@mui/icons-material';
import { ContactWrapper, ContactSidebar, ContactTab, ContactHeader, ContactTabContent } from './styles';
import { getAllContacts } from '../../redux/actions/contact.action';

import TabPanel from '../../components/UI/TabPanel/index';
import GlobalLoading from '../../components/UI/GlobalLoading/index';
import OnlineTab from './TabContent/OnlineTab';
const PendingTab = React.lazy(() => import('./TabContent/PendingTab'));
const BlockedTab = React.lazy(() => import('./TabContent/BlockedTab'));

const a11yProps = (index) => {
  return {
    id: `tabBody-${index}`,
    'aria-controls': `tabBody-${index}`,
  };
};

const Contact = () => {
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
      <ContactSidebar className="contact-sidebar">
        <div className="contact-sidebar__title">
          Contacts
          <PeopleAlt />
          <div className="count">{contacts?.length}</div>
        </div>
        <div className="contact-sidebar__search">
          <input type="text" className="contact-sidebar__input" placeholder="Search contact" />
          <Search />
        </div>
        <div className="contact-sidebar__list">
          {isLoading ? (
            <GlobalLoading />
          ) : (
            contacts.map((element, i) => (
              <div className="contact-sidebar__item" key={i}>
                <Avatar />
                <div className="contact-sidebar__name">{element.username}</div>
              </div>
            ))
          )}
        </div>
      </ContactSidebar>
      <ContactTab>
        <ContactHeader className="contact__header">
          <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { display: 'none' } }}>
            <Tab label="Online" {...a11yProps(0)} disableRipple />
            <Tab label="Pending" {...a11yProps(1)} disableRipple />
            <Tab label="Blocked" {...a11yProps(2)} disableRipple />
          </Tabs>
        </ContactHeader>
        <ContactTabContent className="contact__tabContent">
          <TabPanel value={value} index={0}>
            {isLoading ? <GlobalLoading /> : <OnlineTab contacts={contacts} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Suspense fallback={<GlobalLoading />}>
              <PendingTab />
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Suspense fallback={<GlobalLoading />}>
              <BlockedTab />
            </Suspense>
          </TabPanel>
        </ContactTabContent>
      </ContactTab>
    </ContactWrapper>
  );
};

export default Contact;
