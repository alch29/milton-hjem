export function useDateFormat() {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return { formatDate, formatTime };
}
