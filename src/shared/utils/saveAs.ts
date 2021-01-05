/**
 * Stores a blob (binary data) in a link and clicks on it.
 * Useful to save media types like `*.pdf` or `*.jpg` files on disk.
 * @param blob
 * @param fileName
 */
export function saveAs(blob: Blob, fileName: string): void {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  // On Edge, revokeObjectURL should be called only after
  // a.click() has completed, atleast on EdgeHTML 15.15048
  setTimeout(function() {
    window.URL.revokeObjectURL(url);
  }, 1_000);
}
