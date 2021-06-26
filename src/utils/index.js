export const formatNumber = (number) => number.toLocaleString();

export const getStringListOfAttr = (list, attr) =>
  list.map((item) => item[attr]).join(", ");

export const isMobile = () => {
  if (!window) {
    return false;
  }

  return window?.innerWidth <= 768 ?? false;
};
