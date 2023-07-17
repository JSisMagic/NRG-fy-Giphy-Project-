import { loadPage, renderSearchItems } from './components/engine.js';
import {
  HOME,
  FULL_HEART,
  EMPTY_HEART,
  FAVOURITES,
  CONTAINER,
} from './components/constants.js';
import { toggleFavoriteStatus } from './components/engine.js';

document.addEventListener('DOMContentLoaded', async () => {

  document.addEventListener('click', async (event) => {

    if (event.target.classList.contains('nav-link')) {
      await loadPage(event.target.getAttribute('data-page'));
    }

    if (event.target.classList.contains('favorite')) {
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
    }



  });

  // search events
  document.querySelector('input#search').addEventListener('input', async (event) => {
    window.searchTerm = event.target.value;
    await renderSearchItems(window.searchTerm, 0);

    // const container = document.querySelector(CONTAINER);
    // container.innerHTML = `<h1><span id="${SEARCH_RESULTS_TOTAL}"></span> results for "${window.searchTerm}"<h1>`;
    
  });

  window.addEventListener('scroll', () => {

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
      document.getElementById('search-results-total')) {
      renderSearchItems(window.searchTerm, window.offset);
      window.gifLoading = true;
    }
  });

  // upload
  document.getElementById('browse-button').addEventListener('change', async () => {
    gifUpload();
  });

  await loadPage(HOME);
});
