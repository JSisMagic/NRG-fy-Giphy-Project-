import { CONTAINER_SELECTOR, HOME, FAVORITES, ABOUT } from '../common/constants.js';
import { toCategoriesView } from '../views/category-view.js';
import { toHomeView } from '../views/home-view.js';
import { toMoviesFromCategoryView, toSingleMovieView } from '../views/movie-views.js';
import { q, setActiveNav } from './helpers.js';
import { loadTrending, loadCategory, loadFavorites, loadMovies } from '../requests/request-service.js';
import { getMovieById } from '../data/movies.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoritesView } from '../views/favorites-view.js';

// public API
export const loadPage = async (page = '') => {

  switch (page) {

  case HOME:
    setActiveNav(HOME);
    const gifsObj = await loadTrending();
    return renderHome(gifsObj);
  case FAVORITES:
    setActiveNav(FAVORITES);
    return renderFavorites();
  case ABOUT:
    setActiveNav(ABOUT);
    return renderAbout();

    /* if the app supports error logging, use default to log mapping errors */
  default: return null;
  }

};

export const renderMovieDetails = (id = null) => {

  const movie = getMovieById(id);

  q(CONTAINER_SELECTOR).innerHTML = toSingleMovieView(movie);
};

export const renderCategory = (categoryId = null) => {
  const category = loadCategory(categoryId);
  const movies = loadMovies(categoryId);
  q(CONTAINER_SELECTOR).innerHTML = toMoviesFromCategoryView(category, movies);
};

// private functions

const renderHome = (obj) => {
  q(CONTAINER_SELECTOR).innerHTML = toHomeView(obj);
};

const renderFavorites = () => {
  const movies = loadFavorites();
  q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(movies);
};

const renderAbout = () => {
  q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};
