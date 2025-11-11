/**
 * 
 *
 * @param {string} path 
 * @param {Object} [query] 
 * @returns {string} 
 */
export function createPageUrl(path = "/", query = {}) {
  if (!query || Object.keys(query).length === 0) {
    return path;
  }

  const queryString = new URLSearchParams(query).toString();
  return `${path}?${queryString}`;
}
