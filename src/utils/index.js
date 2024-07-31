export const formatNumber = (number) => number.toLocaleString();

export const isMobile = () => {
  if (!process.browser) {
    return false;
  }

  return window?.innerWidth <= 768 ?? false;
};
