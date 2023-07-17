import { KEY_RADO } from './constants.js';

const getGifsByIds = async (Ids) => {
  try {
    const url = `https://api.giphy.com/v1/gifs?ids=${Ids}&api_key=${KEY_RADO}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};

//

export const getTrendingGifs = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${KEY_RADO}`;
    const response = await fetch(url);
    const data = await response.json();
    const gifsArr = data.data;

    return gifsArr;
  } catch (e) {
    console.error(e);
  }
};

export const getSearchResults = async (searchTerm) => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${KEY_RADO}&q=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    const gifsArr = data.data;

    return gifsArr;
  } catch (e) {
    console.error(e);
  }
};

export const manageFavourites = {
  arr: [],

  add(id) {
    this.arr.push(id);
  },

  remove(id) {
    this.arr = this.arr.filter((x) => x !== id);
  },

  async get() {
    const ids = this.arr.join(',');

    return await getGifsByIds(ids);
  },
};
