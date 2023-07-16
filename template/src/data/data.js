import { keyGergana, SEARCH_LIMIT } from '../common/constants.js';
import { movies, categories } from './movies-data.js';

const findCategory = (categoryId) => {
  return categories.find((c) => c.id === categoryId) || { id: -1, name: '' };
};

// public API

export const getMoviesGeneralInfo = (categoryId = null) => {
  const moviesFilter = categoryId
    ? (m) => m.genre === findCategory(categoryId).name
    : () => true;

  return movies.filter(moviesFilter).map((m) => ({
    id: m.id,
    title: m.title,
    genre: m.genre,
    year: m.year,
    poster: m.poster,
  }));
};

export const getMoviesFullInfo = (categoryId = null) => {
  if (categoryId) {
    return movies.filter((m) => m.genre === findCategory(categoryId).name);
  }

  return movies;
};

export const getMovieById = (movieId = 0) =>
  movies.find((m) => m.id === movieId);

export const trendingGifs = async () => {
  try {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=8sqJpEYE537qoAIdMmET7e54DABNO8vP`;
    const results = await fetch(url);
    const resultsObject = await results.json();

    return resultsObject.data;
  } catch (e) {
    console.error(e);
  }
};

export const searchGifs = async (searchTerm = '', offset = 0) => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=8sqJpEYE537qoAIdMmET7e54DABNO8vP&q=${searchTerm}&limit=${SEARCH_LIMIT}&offset=${offset}&rating=g`;
    const results = await fetch(url);
    const resultsObject = await results.json();

    return resultsObject;
  } catch (e) {
    console.error(e);
  }
};

// title
//   ? movies.filter(m => m.title.toLowerCase().includes(title.toLowerCase()))
//   : movies;

export const getCategory = (categoryId = null) => {
  return categories.find((c) => c.id === categoryId) || null;
};

export const getCategories = () =>
  categories.map((category) => ({
    ...category,
    moviesCount: movies.filter((m) => m.genre === category.name).length,
  }));

export const gifUpload = async () => {
  const apiKey = keyGergana;
  const files = document.getElementById('browse-button').files;
  const file = files[0];
  const form = new FormData();
  form.append('file', file);
  await fetch(`http://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
    method: 'POST',
    body: form,
  });
};
