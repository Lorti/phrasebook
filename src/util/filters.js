export function pluralize(count, label) {
  if (count === 1) {
    return `${count} ${label}`;
  }
  return `${count} ${label}s`;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function domain(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') {
    parts.shift();
  }
  return parts.join('.');
}

export function time(timestamp) {
  const between = (Date.now() - new Date(timestamp)) / 1000;
  if (between < 3600) {
    return pluralize(Math.floor(between / 60), 'minute');
  } else if (between < 86400) {
    return pluralize(Math.floor(between / 3600), 'hour');
  }
  return pluralize(Math.floor(between / 86400), 'day');
}
