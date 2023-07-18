import { KEY_RADO, SEARCH_LIMIT, KEY_GERGANA, KEY_NIA } from './constants.js';
import { addUploaded, getFavorites, getUploaded } from './local-storage.js';


export const getGifsByIds = async ids => {
  try {
    const getByIdsURL = `https://api.giphy.com/v1/gifs?api_key=${KEY_RADO}&ids=${ids.join("%2C")}`;
    const { data } = await fetch(getByIdsURL).then(res => res.json());
    return data;
  } catch (e) {
    console.error(e);
  }
};
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
export const loadUploaded = async () => {
  try {
    const uploaded = getUploaded();
    const data = (uploaded.length !== 0) ? await getGifsByIds(uploaded) : null;
    return data;
  } catch (e) {
    console.error(e);
  }
};

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
