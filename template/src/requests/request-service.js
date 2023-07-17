import {
  getCategories,
  getMoviesGeneralInfo,
  getMovieById,
  getCategory,
  searchGifs,
  trendingGifs,
} from '../data/data.js';
import { getFavorites } from '../data/favorites.js';

export const loadCategories = () => {
  const load = getCategories();
  return load;
};

export const loadCategory = (id = null) => {
  const category = getCategory(id);

  return category;
};

export const loadMovies = (categoryId = null) => {
  const movies = getMoviesGeneralInfo(categoryId);

  return movies;
};

export const loadSingleGif = async (id) => {
  const singleMovie = await getMovieById(id);

  return singleMovie;
};

export const loadSearchGifs = async (searchTerm = '', offset = 0) => {

  try {
    const foundGifsObj = await searchGifs(searchTerm, offset);
    return foundGifsObj;
  } catch (e) {
    console.error(e);
  }
};

export const loadTrending = async () => {
  try {
    const trendingGifsObj = await trendingGifs();
    return trendingGifsObj;
  } catch (e) {
    console.error(e);
  }
};

export const loadFavorites = async () => {

  try {
    const gifIds = getFavorites();
    return await Promise.allSettled(gifIds.map(async (id) => await loadSingleGif(id)));

  } catch (e) {
    console.error(e)
  }
};
