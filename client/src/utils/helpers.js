export const formatToTime = (datetime) => {
  const date = new Date(datetime);
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
  return time;
};
