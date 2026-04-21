export const debounce = (fn,delay) => {
  let timeoutId;
  
  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
  
  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debounced;
};