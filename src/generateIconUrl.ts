/**
 * @todo REMOVE AFTER TESTS
 */
export function generateTagLink(type?: 'preload') {
  const head = document.getElementsByTagName('HEAD')[0];
  const link = document.createElement('link');

  link.href = './fr-icons.css';
  link.rel = type === 'preload' ? 'preload' : 'stylesheet';
  link.type = 'text/css';

  if (type === 'preload') {
    link.as = 'style';
  }

  head.appendChild(link);
}
