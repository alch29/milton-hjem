/**
 * Composable that provides a date formatting utility.
 * @returns {{ formatDate: function(Date): string }}
 */
export function useFormatDate() {

  /**
   * Formats a Date object as a day/month/year string.
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date string (e.g. '4/3/2025'), or an empty string if falsy.
   */
  function formatDate(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}/${year}`;
  };

  return { formatDate };
};