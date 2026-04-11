/**
 * Fetches data from a given URL using the Fetch API.
 *
 * @async
 * @param {string} url - the url to fetch data from
 * @param {object} options - fetch options
 * @return {Promise<object>} - the fetched data as a JS object
 */
const fetchData = async (url, options = {}) => {
  console.log('fetching data from url: ', url);

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Merge user options with default headers
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, finalOptions);
  const json = await response.json();

  if (!response.ok) {
    console.log('json', json);
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }

  return json;
};

export { fetchData };
