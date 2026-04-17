/**
 * Extracts YouTube Video ID from various URL formats
 */
export function getYouTubeID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Returns a valid YouTube embed URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeID(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
