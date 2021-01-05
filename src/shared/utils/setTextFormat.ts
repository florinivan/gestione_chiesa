export const setTextFormat = (text: string | undefined, allWord = true) => {
  if (text) {
    const words: string[] = [];
    const splitdescriptions = text.toLowerCase().split(' ');
    if (allWord) {
      splitdescriptions.forEach(splitdescription => {
        const word = splitdescription.charAt(0).toUpperCase() + splitdescription.slice(1);
        words.push(word);
      });
    } else {
      const word = splitdescriptions[0].charAt(0).toUpperCase() + splitdescriptions[0].slice(1);
      words.push(word);
      for (let i = 1; i < splitdescriptions.length; i++) {
        words.push(splitdescriptions[i]);
      }
    }

    return words.join(' ');
  } else {
    return '';
  }
};
