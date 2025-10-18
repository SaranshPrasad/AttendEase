/**
 * Generate a URL with optional query parameters.
 *
 * @param {string} path - The base path of the URL (e.g., "/dashboard").
 * @param {Object} [query] - An object of query parameters to append (e.g., { page: 2, sort: "asc" }).
 * @returns {string} - The full URL string (e.g., "/dashboard?page=2&sort=asc").
 */
export function createPageUrl(path = "/", query = {}) {
  if (!query || Object.keys(query).length === 0) {
    return path;
  }

  const queryString = new URLSearchParams(query).toString();
  return `${path}?${queryString}`;
}
