export function replaceAll(d: string, s: string[][]): string {
  let result = d;
  s.forEach((item) => {
    const [match, replacement] = item;
    result = result.replace(match, replacement);
  });
  return result;
}
