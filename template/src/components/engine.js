import {
  CONTAINER,
  HOME,
  GIFS_PER_LINE,
  FAVOURITES,
  SEARCH,
} from './constants.js';
import { getSearchResults, getTrendingGifs } from './data.js';
import { simpleView, simpleViewFav } from './views/simple-view.js';
import { homeView } from './views/home-view.js';
import {
  favouritesView,
  favouritesEmptyView,
} from './views/favourites-view.js';
import { searchView } from './views/search-view.js';
import { manageFavourites } from './data.js';

export const loadPage = async (page = '', searchTerm = '') => {
  switch (page) {
  case HOME:
    setActiveNav(HOME);

    const trendingArr = await getTrendingGifs();

    return renderHome(trendingArr);

  case FAVOURITES:
    const gifs = await manageFavourites.get();

    setActiveNav(FAVOURITES);
    return renderFavourites(gifs);

  case SEARCH:
    const searchArr = await getSearchResults(searchTerm);

    return renderSearchResults(searchArr, searchTerm);

  default:
    return null;
  }
};

function setActiveNav(page) {
  const navs = document.querySelectorAll('a.nav-link');

  Array.from(navs).forEach((element) =>
    element.getAttribute('data-page') === page ?
      element.classList.add('active') :
      element.classList.remove('active'),
  );
}

// rendering

function renderHome(trendingArr) {
  const gifs = trendingArr.slice(0, GIFS_PER_LINE).map(simpleView).join('\n');

  document.querySelector(CONTAINER).innerHTML = homeView(gifs);
}

export const renderFavourites = (data) => {
  const gifs = data.map((gif) => simpleViewFav(gif)).join('\n');

  if (gifs.length === 0) {
    document.querySelector(CONTAINER).innerHTML = favouritesEmptyView();
  } else {
    document.querySelector(CONTAINER).innerHTML = favouritesView(gifs);
  }
};

function renderSearchResults(gifsArr, searchTerm) {
  const gifs = gifsArr.slice(0, GIFS_PER_LINE).map(simpleView).join('\n');

  document.querySelector(CONTAINER).innerHTML = searchView(gifs, searchTerm);
}
