import React from 'react';

interface BoldableTextProps {
  text: string;
  className?: string;
}

export const BoldableText: React.FC<BoldableTextProps> = React.memo(({ text, className }) => {
  // shortest match for marked text with <b> tag
  const re1 = /<b>(.+?)<\/b>/g;
  // for removing tags included in the string matched by re1
  const re2 = /<b>(.+)<\/b>/;

  // strings to re-markup with JSX
  const matched = text
    ?.match(re1) // ["<b>a bold text<b>", "<b>another one</b>"]
    ?.map((s) => s?.match(re2)?.[1]); // ["a bold text", "another one"]

  // split strings to re-markup
  const texts = text.split(re1); // ["This sentense has ", "a bold text", " and", ...]

  const markedJsx = texts.map((s, index) => {
    if (index === 0 || index === texts.length - 1) {
      // first and last item is not the target to re-markup
      // because "<b>foo bar</b> buz..." generates ["", "foo bar", " buz"...]
      return s;
    }

    if (matched?.includes(s)) {
      return (
        <b className={className} key={s}>
          {s}
        </b>
      ); // re-markup!!
    }

    return s;
  });

  return <>{markedJsx}</>;
});
