import { KEY_RADO, SEARCH_LIMIT } from './constants.js';
import { getFavorites } from './local-storage.js';


const getGifById = async (gifId = '') => {
  try {
    const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=8sqJpEYE537qoAIdMmET7e54DABNO8vP&rating=g`;
    const result = await fetch(url);
    const resultObject = await result.json();

    return resultObject.data;
  } catch (e) {
    console.error(e);
  }
}


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
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${KEY_RADO}`;
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
    return await Promise.allSettled(gifIds.map(async (id) => await getGifById(id)));

  } catch (e) {
    console.error(e)
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
