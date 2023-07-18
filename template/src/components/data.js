import { KEY_RADO, SEARCH_LIMIT, KEY_GERGANA, KEY_NIA } from './constants.js';
import { addUploaded, getFavorites, getUploaded } from './local-storage.js';

/**
 * Retrieves a GIF by its ID from the Giphy API.
 *
 * @async
 * @function
 * @param {string} gifId - The ID of the GIF to fetch from the Giphy API.
 * @return {Promise<Object>} A Promise that resolves to the GIF data as an object from the Giphy API.
 * @throws {Error} If there is an error during the API call or JSON parsing.
 */
export const getGifById = async (gifId = '') => {
  try {
    const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${KEY_GERGANA}`;
    const result = await fetch(url);
    const resultObject = await result.json();

    return resultObject.data;
  } catch (e) {
    console.error(e);
  }
};

export const getGifsByIds = async ids => {
  try {
    const getByIdsURL = `https://api.giphy.com/v1/gifs?api_key=${KEY_RADO}&ids=${ids.join('%2C')}`;
    const { data } = await fetch(getByIdsURL).then(res => res.json());
    return data;
  } catch (e) {
    console.error(e);
  }
};


/**
 * Retrieves a list of trending GIFs from the Giphy API.
 *
 * @async
 * @function
 * @return {Promise<Array<Object>>} A Promise that resolves to an array of GIF data objects from the Giphy API.
 * @throws {Error} If there is an error during the API call or JSON parsing.
 */
export const getTrendingGifs = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${KEY_RADO}&limit=${SEARCH_LIMIT}`;
    const response = await fetch(url);
    const data = await response.json();
    const gifsArr = data.data;

    return gifsArr;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Retrieves a list of GIFs from the Giphy API based on the provided search term and offset.
 *
 * @async
 * @function
 * @param {string} searchTerm - The search term used to find GIFs in the Giphy API.
 * @param {number} offset - The offset used for pagination, specifying the starting index of the search results.
 * @return {Promise<Object>} A Promise that resolves to an object containing search results from the Giphy API.
 * @throws {Error} If there is an error during the API call or JSON parsing.
 */
export const getSearchGifs = async (searchTerm = '', offset = 0) => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=8sqJpEYE537qoAIdMmET7e54DABNO8vP&q=${searchTerm}&limit=${SEARCH_LIMIT}&offset=${offset}&rating=g`;
    const results = await fetch(url);
    const resultsObject = await results.json();

    return resultsObject;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Loads the user's favorite GIFs by retrieving their data from the Giphy API.
 *
 * @async
 * @function
 * @return {Promise<Array<PromiseSettledResult<Object>>>} A Promise that resolves to an array of PromiseSettledResult objects.
 * @throws {Error} If there is an error while retrieving the favorite GIF IDs or when fetching individual GIF data.
 */
export const loadFavorites = async () => {
  try {
    const gifIds = getFavorites();
    return await Promise.allSettled(
      gifIds.map(async (id) => await getGifById(id)),
    );
  } catch (e) {
    console.error(e);
  }
};

/**
 * Retrieves a random GIF from the Giphy API.
 *
 * @async
 * @function
 * @return {Promise<Object>} A Promise that resolves to an object containing the random GIF data from the Giphy API.
 * @throws {Error} If there is an error during the API call or JSON parsing.
 */
export const getRandomGif = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${KEY_NIA}`;
    const results = await fetch(url);
    const resultsObject = await results.json();

    return resultsObject.data;
  } catch (e) {
    console.error(e);
  }
};

export const loadUploaded = async () => {
  try {
    const uploaded = getUploaded();
    const data = (uploaded.length !== 0) ? await getGifsByIds(uploaded) : null;
    return data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Uploads a GIF file to Giphy using the Giphy API.
 *
 * @async
 * @function
 * @throws {Error} If there is an error during the API call or file upload process.
 */
export const gifUpload = async () => {
  const apiKey = KEY_NIA;
  const files = document.getElementById('browse-button').files;
  const file = files[0];
  const form = new FormData();
  form.append('file', file);
  const response = await fetch(`http://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
    method: 'POST',
    body: form,
  }).then(resp => resp.json());
  addUploaded(response.data.id);
};
