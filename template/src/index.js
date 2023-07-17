import { loadPage, renderSearchItems } from './components/engine.js';
import {
  HOME,
  FULL_HEART,
  EMPTY_HEART,
  FAVOURITES,
  CONTAINER,
} from './components/constants.js';
import { manageFavourites } from './components/data.js';

document.addEventListener('DOMContentLoaded', async () => {

  document.addEventListener('click', async (event) => {

    if (event.target.classList.contains('nav-link')) {
      await loadPage(event.target.getAttribute('data-page'));
    }

    if (event.target.classList.contains('fav-button')) {
      event.preventDefault();
      const favButton = event.target;
      const gifID = favButton.getAttribute('data-gif-id');

      if (favButton.innerHTML === EMPTY_HEART) {
        favButton.innerHTML = FULL_HEART;
        manageFavourites.add(gifID);
      } else {
        favButton.innerHTML = EMPTY_HEART;
        manageFavourites.remove(gifID);
        if (favButton.id === 'in-favourites') {
          await loadPage(FAVOURITES);
        }
      }
    }
  });

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

  document.getElementById('browse-button').addEventListener('change', async () => {
    gifUpload();
  });

  await loadPage(HOME);
});
