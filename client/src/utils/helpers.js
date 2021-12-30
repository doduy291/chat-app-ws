export const formatToTime = (datetime) => {
  const timestampInDB = new Date(datetime);
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const time = timestampInDB.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

  // Yesterday
  if ((currentDate.getTime() - timestampInDB.getTime()) / oneDay === 1) {
    return `Yesterday at ${time}`;
  }

  // Days ago
  if ((currentDate.getTime() - timestampInDB.getTime()) / oneDay > 1) {
    const date = timestampInDB.toLocaleDateString('vi-VN', {
      dateStyle: 'short',
    });
    return `${date} at ${time}`;
  }

  // Today
  return `Today at ${time}`;
};

export const formatToMsTime = (datetime) => {
  const date = new Date(datetime);
  const milliseconds = date.getTime();
  return milliseconds;
};
