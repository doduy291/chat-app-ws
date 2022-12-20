export const formatToTime = (datetime) => {
  const timestamp = new Date(datetime);

  // Convert to dd/mm/yyyy
  const timestampLocaleDate = timestamp.toLocaleDateString().split('T')[0];
  const currentLocaleDate = new Date().toLocaleDateString().split('T')[0];

  const oneDay = 24 * 60 * 60 * 1000;

  const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

  const getDaysDiffBetweenDates = (dateInitial, dateFinal) => {
    return (new Date(dateFinal) - new Date(dateInitial)) / oneDay;
  };

  // Yesterday
  if (getDaysDiffBetweenDates(timestampLocaleDate, currentLocaleDate) === 1) {
    return `Yesterday at ${time}`;
  }

  // Days ago
  if (getDaysDiffBetweenDates(timestampLocaleDate, currentLocaleDate) > 1) {
    const date = timestamp.toLocaleDateString('vi-VN', {
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

export const formatToDate = (datetime) => {
  const timestamp = new Date(datetime);
  const date = timestamp.toLocaleDateString('vi-VN', {
    dateStyle: 'short',
  });
  return date;
};

export const formatFromByte = (byte) => {
  if (byte >= 1000000) return `${Number(byte * 0.000001)} MB`;
  if (byte < 1000000) return `${Number(byte * 0.001)} KB`;
};
