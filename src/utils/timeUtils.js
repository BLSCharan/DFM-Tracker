export const formatMinutes = (seconds) => {
  const mins = Math.ceil(seconds / 60);
  return `${mins} mins`;
};
