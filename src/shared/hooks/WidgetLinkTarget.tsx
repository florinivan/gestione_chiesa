export function linkTarget(link: string) {
  if (link && (link.startsWith('https://') || link.startsWith('http://'))) {
    const linkWithoutHttp = link.replace(/(^\w+:|^)\/\//, '');
    const linkArray = linkWithoutHttp.split('/');

    if (linkArray[0].includes('www.sisal.it')) {
      // stay in the same page in case it includes sisal domain
      return '_self';
    }
    // open new page in case it is an external link
    return 'blank';
  }
  // stay in the same page in case is internal link
  return '_self';
}
