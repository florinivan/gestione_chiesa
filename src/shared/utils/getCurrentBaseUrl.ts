export const getCurrentBaseUrl = () => {
  const { protocol, hostname, port } = window.location;

  if (port) {
    return `${protocol}//${hostname}:${port}`;
  }

  return `${protocol}//${hostname}`;
};
