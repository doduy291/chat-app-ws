export const filteredContactChannel = (contactId, userId, contactsArr) => {
  const comparedArray = [userId, contactId];
  let channelId;

  contactsArr?.chatChannels.forEach((channel) => {
    const doesExist = channel.members.every((member) => comparedArray.includes(member));
    if (doesExist) {
      channelId = channel._id;
    }
  });

  return `/channel/${channelId}`;
};
