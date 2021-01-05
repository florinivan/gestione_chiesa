export default function isEntityParentChild(parentKey: string, childKey: string) {
  return childKey.startsWith(parentKey) && childKey.charAt(parentKey.length) === '-';
}
