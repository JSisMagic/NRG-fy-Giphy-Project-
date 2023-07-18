import {
  CONTAINER,
  HOME,
  GIFS_PER_LINE,
  FAVOURITES,
  ABOUT,
  SEARCH_LIMIT,
  EMPTY_HEART,
  FULL_HEART,
  SEARCH_RESULTS_TOTAL,
  DETAILS,
  UPLOADED,
} from './constants.js';
import { getTrendingGifs, getSearchGifs, loadFavorites, getGifById, loadUploaded } from './data.js';
import { simpleView } from './views/simple-view.js';
import { homeView } from './views/home-view.js';
import {
  favouritesView,
  favouritesEmptyView,
} from './views/favourites-view.js';
import { searchView } from './views/search-view.js';
import { toAboutView } from './views/about-view.js';
import { getFavorites, addFavorite, removeFavorite } from './local-storage.js';
import { gifDetailedView } from './views/gif-detailed-view.js';
import { uploadedEmptyView, uploadedView } from './views/uploaded-view.js';

export const loadPage = async (page = '', id) => {
  switch (page) {
    case HOME:
      setActiveNav(HOME);

      const trendingArr = await getTrendingGifs();

      return renderHome(trendingArr);

    case FAVOURITES:
      setActiveNav(FAVOURITES);

      const loadedGifs = await loadFavorites();
      const gifs = loadedGifs.map((element) => element.value);

      if (gifs.length > 0) {
        return renderFavourites(gifs);
      } else {
        const randomGif = await getRandomGif();
        return renderFavourites('', randomGif);
      }

    case UPLOADED:
      setActiveNav(UPLOADED);
      const uploadedGifs = await loadUploaded();

      return renderUploaded(uploadedGifs);


    case ABOUT:
      setActiveNav(ABOUT);
      return renderAbout();

    case DETAILS:
      const gif = await getGifById(id);
      console.log(gif);
      return renderGifDetails(gif);

    default:
      return null;
  }
};

function setActiveNav(page) {
  const navs = document.querySelectorAll('.nav-link');

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

function renderGifDetails(gif) {
  document.querySelector(CONTAINER).innerHTML = gifDetailedView(gif);
}


function renderFavourites(gifs, randomGif) {

  if (gifs.length > 0) {
    const gifsToRender = gifs.map(simpleView).join('\n');
    document.querySelector(CONTAINER).innerHTML = favouritesView(gifsToRender);
  } else {
    document.querySelector(CONTAINER).innerHTML = favouritesEmptyView(gifsToRender);
  }
}
function renderUploaded(gifs) {
  const gifsToRender = gifs.map(simpleView).join('\n');
  console.log(gifs);
  if (gifsToRender.length > 0) {
    document.querySelector(CONTAINER).innerHTML = uploadedView(gifsToRender);
  } else {
    document.querySelector(CONTAINER).innerHTML = uploadedEmptyView(gifsToRender);
  }
}

export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  const heartSpan = document.querySelector(`span[data-gif-id="${gifId}"]`);

  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
    heartSpan.classList.remove('active');
    heartSpan.innerHTML = EMPTY_HEART;
  } else {
    addFavorite(gifId);
    heartSpan.classList.add('active');
    heartSpan.innerHTML = FULL_HEART;
  }
};

window.gifLoading = false;

export async function renderSearchItems(searchTerm, offset = 0) {

  offset === 0 ?
    document.querySelector(CONTAINER)
      .innerHTML = `<h1><span id="${SEARCH_RESULTS_TOTAL}"></span> results for "${window.searchTerm}"<h1>` :
    document.querySelector(CONTAINER).innerHTML;

  if (!window.gifLoading) {

    try {
      const gifsObj = await getSearchGifs(searchTerm, offset);
      const gifs = gifsObj.data.map(simpleView).join('\n');

      document.querySelector(`#${SEARCH_RESULTS_TOTAL}`).innerHTML = gifsObj.pagination.total_count;
      document.querySelector(CONTAINER).innerHTML += searchView(gifs);

      window.offset += SEARCH_LIMIT;

    } catch (e) {
      console.error(e);
    }

    window.gifLoading = false;
  }
}

const renderAbout = () => {
  document.querySelector(CONTAINER).innerHTML = toAboutView();
};
