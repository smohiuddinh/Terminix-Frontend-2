function _parseLocalOrIso(dateInput) {
  if (!dateInput) return new Date(NaN);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y,m,d] = dateInput.split('-').map(s => parseInt(s,10));
    return new Date(y, m-1, d);
  }
  return new Date(dateInput);
}

export function formatSingleDate(dateInput) {
  const date = _parseLocalOrIso(dateInput);
  const optionsStart =  { day: 'numeric', month: 'long' };
  const optionsEnd = { day: 'numeric', month: 'long', year: 'numeric' };
  const startMonth = new Intl.DateTimeFormat('en-US', optionsStart).format(date);
  const endDate = new Intl.DateTimeFormat('en-US', optionsEnd).format(date);
  return `${startMonth} - ${endDate}`;
}

export function formatDate(dateString) {
  const date = _parseLocalOrIso(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}, ${month} ${year}`;
}

export function getDateLabel(timestamp) {
  const msgDate = _parseLocalOrIso(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(msgDate, today)) return 'Today';
  if (isSameDay(msgDate, yesterday)) return 'Yesterday';

  return msgDate.toLocaleDateString(); // fallback: e.g., 7/22/2025
}

export function formatTo12HourTime(dateInput) {
  const date = _parseLocalOrIso(dateInput);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  // fallback: e.g., 7:00 am
}


  // export const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  export const getRelativeTime = (dateString) => {
    const now = new Date();
    const date = _parseLocalOrIso(dateString);
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };






