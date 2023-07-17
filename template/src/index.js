import { loadPage } from './components/engine.js';
import {
  HOME,
  SEARCH,
  FULL_HEART,
  EMPTY_HEART,
  FAVOURITES,
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

  document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      const search = document.querySelector('input#search');
      await loadPage(SEARCH, search.value);
      search.value = '';
    }
  });

  await loadPage(HOME);
});
