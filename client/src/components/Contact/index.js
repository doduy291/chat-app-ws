import React from 'react';
import { Tabs, Tab, Avatar } from '@mui/material';
import { PeopleAlt, Search } from '@mui/icons-material';

import OnlineTab from './TabContent/OnlineTab';
import PendingTab from './TabContent/PendingTab';
import BlockedTab from './TabContent/BlockedTab';

import TabPanel from '../UI/TabPanel/index';
import { ContactWrapper, ContactSidebar, ContactTab, ContactHeader, ContactTabContent } from './styles';

const a11yProps = (index) => {
  return {
    id: `tabBody-${index}`,
    'aria-controls': `tabBody-${index}`,
  };
};

const Contact = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ContactWrapper>
      <ContactSidebar className="contact-sidebar">
        <div className="contact-sidebar__title">
          Contacts
          <PeopleAlt />
        </div>
        <div className="contact-sidebar__search">
          <input type="text" className="contact-sidebar__input" placeholder="Search contact" />
          <Search />
        </div>
        <div className="contact-sidebar__list">
          {[...Array(15)].map((x, i) => (
            <div className="contact-sidebar__item" key={i}>
              <Avatar />
              <div className="contact-sidebar__name">Username</div>
            </div>
          ))}
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
            <OnlineTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PendingTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BlockedTab />
          </TabPanel>
        </ContactTabContent>
      </ContactTab>
    </ContactWrapper>
  );
};

export default Contact;
