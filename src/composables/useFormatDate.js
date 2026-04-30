/** @module composables/useFormatDate */

/**
 * Composable that handles date formatting.
 * @memberof module:composables/useFormatDate
 * @returns {{ formatDate: function(Date): string }}
 */
export function useFormatDate() {

  /**
   * Formats a Date object as a day/month/year string.
   * @function formatDate
   * @memberof module:composables/useFormatDate
   * @param {Date} date - The date to be formatted.
   * @returns {string} The formatted date string, or an empty string if false.
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