import {
  KEY_RADO,
  SEARCH_LIMIT,
  KEY_GERGANA,
  KEY_NIA,
  UPLOADED,
} from './constants.js';
import { loadPage } from './engine.js';
import { addUploaded, getFavorites, getUploaded } from './local-storage.js';

export const getGifById = async (gifId = '') => {
  try {
    const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${KEY_GERGANA}&rating=g`;
    const response = await fetch(url);
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGifsByIds = async (ids) => {
  try {
    const getByIdsURL = `https://api.giphy.com/v1/gifs?api_key=${KEY_RADO}&ids=${ids.join('%2C')}`;
    const response = await fetch(getByIdsURL);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingGifs = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${KEY_RADO}&limit=${SEARCH_LIMIT}`;
    const response = await fetch(url);
    const data = await response.json();
    const gifsArr = data.data;
    return gifsArr;
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/categories?api_key=${KEY_GERGANA}`;
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.data;
    return categories;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchGifs = async (searchTerm = '', category = '', offset = 0) => {
  try {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${KEY_RADO}&q=${searchTerm}&limit=${SEARCH_LIMIT}&offset=${offset}&rating=g`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await fetch(url);
    const resultsObject = await response.json();
    return resultsObject;
  } catch (error) {
    console.error(error);
  }
};

export const loadFavorites = async () => {
  try {
    const gifIds = getFavorites();
    return await Promise.allSettled(
      gifIds.map(async (id) => await getGifById(id))
    );
  } catch (error) {
    console.error(error);
  }
};

export const getRandomGif = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${KEY_NIA}`;
    const response = await fetch(url);
    const resultsObject = await response.json();
    return resultsObject.data;
  } catch (error) {
    console.error(error);
  }
};

export const loadUploaded = async () => {
  try {
    const uploaded = getUploaded();
    const data = uploaded.length !== 0 ? await getGifsByIds(uploaded) : null;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const gifUpload = async () => {
  const apiKey = KEY_NIA;
  const files = document.getElementById('browse-button').files;
  const file = files[0];
  const form = new FormData();
  form.append('file', file);

  try {
    const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
      method: 'POST',
      body: form,
    });
    const responseData = await response.json();
    addUploaded(responseData.data.id);

    const confirmAlert = confirm('GIF uploaded successfully!\nSee your uploads?');
    if (confirmAlert) {
      await loadPage(UPLOADED);
    }
  } catch (error) {
    console.error(error);
  }
};
