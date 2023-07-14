import { getCategories, getMoviesGeneralInfo, getMovieById, getCategory, searchGifs } from '../data/movies.js';
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

export const loadSingleMovie = (id) => {
  const singleMovie = getMovieById(id);

  return singleMovie;
};

export const loadSearchGifs = async (searchTerm = '') => {

  try {
    const foundGifsObj = searchGifs(searchTerm);
    return foundGifsObj;
  } catch (e) {
    console.error(e);
  }
};

export const loadFavorites = () => {
  const moviesIds = getFavorites();
  const movies = moviesIds.map(id => loadSingleMovie(id));
  return movies;
};
