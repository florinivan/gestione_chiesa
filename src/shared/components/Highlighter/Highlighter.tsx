import React from 'react';
import styles from 'shared/components/Highlighter/highlighter.module.scss';

export const Highlighter = (text: string, search: string) => {
  if (!search) {
    return text;
  }

  const elements = [];

  const textLower = text.toLowerCase();
  const searchLower = search.toLowerCase();
  let startIndex = 0;
  let foundIndex = 0;
  while ((foundIndex = textLower.indexOf(searchLower, startIndex)) !== -1) {
    if (foundIndex !== startIndex) {
      elements.push(text.substring(startIndex, foundIndex));
    }
    startIndex = foundIndex + search.length;
    elements.push(
      <span className={styles.searchValueHighlighter} key={`highlighter_${startIndex}`}>
        {text.substring(foundIndex, startIndex)}
      </span>
    );
  }
  if (startIndex !== text.length) {
    elements.push(text.substring(startIndex, text.length));
  }

  return elements;
};
