import { KEY_RADO, SEARCH_LIMIT, KEY_GERGANA, KEY_NIA } from './constants.js';
import { getFavorites } from './local-storage.js';

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

// const getGifsByIds = async (...Ids) => {
//   try {
//     const url = `https://api.giphy.com/v1/gifs?ids=${Ids}&api_key=${KEY_RADO}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//

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
      gifIds.map(async (id) => await getGifById(id))
    );
  } catch (e) {
    console.error(e);
  }
};

// export const manageFavourites = {
//   arr: [],

//   add(id) {
//     this.arr.push(id);
//   },

//   remove(id) {
//     this.arr = this.arr.filter((x) => x !== id);
//   },

//   async get() {
//     const ids = this.arr.join(',');

//     return await getGifsByIds(ids);
//   },
// };

export const gifUpload = async () => {
  const apiKey = KEY_NIA;
  const files = document.getElementById('browse-button').files;
  const file = files[0];
  const form = new FormData();
  form.append('file', file);
  await fetch(`http://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
    method: 'POST',
    body: form,
  });
};
