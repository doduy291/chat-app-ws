// prevent execute continuously a function
// Seem to work when to use useRef in React and no "return () => {}"
export const debounce = (cbFn, delay, ref) => {
  if (ref.current) {
    clearTimeout(ref.current);
  }
  ref.current = setTimeout(() => {
    cbFn();
  }, delay);
};
