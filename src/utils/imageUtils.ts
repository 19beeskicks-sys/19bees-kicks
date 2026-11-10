/**
 * Safely resolves image URLs to work in local preview, Express dev, and GitHub Pages (subpaths).
 */
export function formatImageUrl(src?: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  // Convert root-relative path to relative path so it respects GitHub Pages subdirectory
  if (src.startsWith('/')) {
    return `.${src}`;
  }
  return src;
}
