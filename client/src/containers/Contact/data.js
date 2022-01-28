export const filteredContactChannel = (contactId, userId, chatChannelsData) => {
  const comparedArray = [userId, contactId];
  let channelId;

  chatChannelsData.forEach((channel) => {
    const doesExist = channel.members.every((member) => comparedArray.includes(member));
    if (doesExist) {
      channelId = channel._id;
    }
  });

  return `/channel/${channelId}`;
};
