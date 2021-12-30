import React, { Suspense } from 'react';
import { Tabs, Tab } from '@mui/material';
import { ContactTab, ContactHeader, ContactTabContent } from './styles';

import TabPanel from '../../../components/UI/TabPanel/index';
import GlobalLoading from '../../../components/UI/GlobalLoading/index';
import OnlineTab from '../TabContent/OnlineTab';
const PendingTab = React.lazy(() => import('../TabContent/PendingTab'));
const BlockedTab = React.lazy(() => import('../TabContent/BlockedTab'));

const ContentTabs = ({ contacts }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `tabBody-${index}`,
      'aria-controls': `tabBody-${index}`,
    };
  };

  return (
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
          <OnlineTab contacts={contacts} />
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
  );
};

export default ContentTabs;
