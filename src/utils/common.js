export const queryParam = (payload) => {
  return new URLSearchParams(payload).toString();
};