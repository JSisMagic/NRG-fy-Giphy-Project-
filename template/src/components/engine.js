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
import { getTrendingGifs, getSearchGifs, loadFavorites, getGifById, loadUploaded, getRandomGif, getCategories } from './data.js';
import { simpleView } from './views/simple-view.js';
import { homeView } from './views/home-view.js';
import {
  favouritesView,
  favouritesEmptyView,
} from './views/favourites-view.js';
import { searchView } from './views/search-view.js';
import { toAboutView } from './views/about-view.js';
import { getFavorites, manageFavorite } from './local-storage.js';
import { gifDetailedView } from './views/gif-detailed-view.js';
import { uploadedEmptyView, uploadedView } from './views/uploaded-view.js';

/**
 * Loads and renders content for the specified page based on the given page identifier and optional GIF ID.
 *
 * @async
 * @function
 * @param {string} page - The page identifier indicating the page to load content for.
 * @param {string} id - Optional GIF ID required for the DETAILS page to fetch specific GIF details.
 * @return {Promise<HTMLElement|null>} A Promise that resolves to an HTMLElement representing the loaded content for the specified page.
 * @throws {Error} If there is an error during the content loading process.
 */
export const loadPage = async (page = '', id) => {
  switch (page) {
  case HOME:
    setActiveNav(HOME);

    const trendingArr = await getTrendingGifs();
    const categoriesArr = await getCategories();
    const categoryNames = categoriesArr.map(category => category.name);
    const categoryGifsPromises = await Promise.allSettled(categoryNames.map(async (name) => await getSearchGifs(name)));
    const categoryGifs = categoryGifsPromises.map((element) => element.value.data);

    return renderHome(trendingArr, categoryNames, categoryGifs);

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

    return renderGifDetails(gif);

  default:
    return null;
  }
};

/**
 * Sets the active class on the navigation link corresponding to the specified page.
 *
 * @function
 * @param {string} page - The page identifier for which the navigation link should be marked as active.
 * @return {void}
 */
function setActiveNav(page) {
  const navs = document.querySelectorAll('.nav-link');

  Array.from(navs).forEach((element) =>
    element.getAttribute('data-page') === page ?
      element.classList.add('active') :
      element.classList.remove('active'),
  );
}

// rendering

/**
 * Renders the home page with trending gifs and categorized gifs.
 *
 * @param {Array} trendingArr - An array containing trending gifs.
 * @param {Array} categoryNames - An array of strings representing category names.
 * @param {Array<Array>} categoryGifs - An array of arrays containing gifs categorized by category.
 * @return {void} This function does not return anything.
 */
function renderHome(trendingArr, categoryNames, categoryGifs) {
  const gifs = trendingArr.slice(0, GIFS_PER_LINE).map(simpleView).join('\n');

  document.querySelector(CONTAINER).innerHTML = homeView(gifs, 'trending');

  const categoryLines = categoryGifs.map(categoryGifLine => categoryGifLine.map(simpleView).join('\n'));
  categoryLines.forEach((categoryLine, index) => document.querySelector(CONTAINER).innerHTML += homeView(categoryLine, categoryNames[index]));
}

/**
  * Renders the GIF details view using the provided GIF data.
  *
  * @function
  * @param {Object} gif - An object containing the details of the GIF to be displayed.
  * @return {void}
  */
function renderGifDetails(gif) {
  const modalContent = document.getElementById('modal-content');
  const simpleViewGif = simpleView(gif);
  modalContent.innerHTML = gifDetailedView(gif, simpleViewGif);

  const modal = document.getElementById('myModal');

  modal.style.display = 'block';

  // const modalContent = document.getElementById("modal-content");
  // modalContent.style.paddingTop = window.scrollY;
}

/**
 * Renders the favorites view with the provided GIFs or a random GIF if the favorites list is empty.
 *
 * @function
 * @param {Array<Object>} gifs - An array of favorite GIF data objects to be displayed on the favorites view.
 * @param {Object} randomGif - An object representing a random GIF to display in case the favorites list is empty.
 * @return {void}
 */
function renderFavourites(gifs, randomGif) {

  if (gifs.length > 0) {
    const gifsToRender = gifs.map(simpleView).join('\n');
    document.querySelector(CONTAINER).innerHTML = favouritesView(gifsToRender);
  } else {
    const randomGifToRender = simpleView(randomGif);
    document.querySelector(CONTAINER).innerHTML = favouritesEmptyView(randomGifToRender);
  }
}

/**
 * Renders the uploaded GIFs view based on the provided GIF data.
 *
 * @function
 * @param {Array<Object>} gifs - An array of uploaded GIF data objects to be displayed in the uploaded view.
 * @return {void}
 */
function renderUploaded(gifs) {
  const gifsToRender = gifs.map(simpleView).join('\n');

  if (gifsToRender.length > 0) {
    document.querySelector(CONTAINER).innerHTML = uploadedView(gifsToRender);
  } else {
    document.querySelector(CONTAINER).innerHTML = uploadedEmptyView(gifsToRender);
  }
}

/**
 * Toggles the favorite status of a GIF based on its ID.
 *
 * @function
 * @param {string} gifId - The ID of the GIF for which to toggle the favorite status.
 * @return {void}
 */
export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  const heartSpan = document.querySelector(`span[data-gif-id="${gifId}"]`);

  if (favorites.includes(gifId)) {
    manageFavorite.removeFavorite(gifId);
    heartSpan.classList.remove('active');
    heartSpan.innerHTML = EMPTY_HEART;

    if (document.getElementById('favourites-link').classList.contains('active')) {
      loadPage(FAVOURITES);
    }
  } else {
    manageFavorite.addFavorite(gifId);
    heartSpan.classList.add('active');
    heartSpan.innerHTML = FULL_HEART;

    if (document.getElementById('favourites-link').classList.contains('active')) {
      loadPage(FAVOURITES);
    }
  }
};

window.gifLoading = false;

/**
 * Renders search items for the specified search term and pagination offset.
 *
 * @async
 * @function
 * @param {string} searchTerm - The search term for which to retrieve and render GIFs.
 * @param {number} offset - The pagination offset indicating the starting index of the search results.
 * @return {Promise<void>} A Promise that resolves when the search items are rendered.
 * @throws {Error} If there is an error during the search API call or rendering process.
 */
export async function renderSearchItems(searchTerm, offset = 0) {

  offset === 0 ?
    document.querySelector(CONTAINER)
      .innerHTML = `<h2><span id="${SEARCH_RESULTS_TOTAL}"></span> results for "${window.searchTerm}"<h2>` :
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

/**
 * Renders the About page view.
 *
 * @function
 * @return {void}
 */
const renderAbout = () => {
  document.querySelector(CONTAINER).innerHTML = toAboutView();
};
