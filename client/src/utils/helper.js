// prevent execute continuously a function
export const debounce = (timer = null, cbFn, delay = 350) => {
  if (timer) {
    clearTimeout(timer);
  }
  return setTimeout(cbFn, delay);
};
