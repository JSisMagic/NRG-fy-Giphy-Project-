import { getCategories, getMoviesGeneralInfo, getMovieById, getCategory, searchMovies } from '../data/movies.js';
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

export const loadSearchMovies = (searchTerm = '') => {
  const foundMovie = searchMovies(searchTerm);

  return foundMovie;
};


export const loadFavorites = () => {
  const moviesIds = getFavorites();
  const movies = moviesIds.map(id => loadSingleMovie(id));
  return movies;
};
