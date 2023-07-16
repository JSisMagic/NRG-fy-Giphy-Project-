import { HOME } from './src/common/constants.js';
import { gifUpload } from './src/data/data.js';
import { toggleFavoriteStatus } from './src/events/favorites-events.js';
import { q } from './src/events/helpers.js';
import {
  loadPage,
  renderCategory,
  renderMovieDetails,
} from './src/events/navigation-events.js';
import { renderSearchItems } from './src/events/search-events.js';

document.addEventListener('DOMContentLoaded', async () => {
  // add global listener
  document.addEventListener('click', async (event) => {
    // nav events
    if (event.target.classList.contains('nav-link')) {
      await loadPage(event.target.getAttribute('data-page'));
    }

    if (event.target === document.getElementById('upload-button')) {
      document.getElementById('browse-button').click();
    }

    if (event.target.classList.contains('btn')) {
      // show category events
      renderCategory(+event.target.getAttribute('data-category'));
    }

    // show movie events
    if (event.target.classList.contains('image-display')) {
      renderMovieDetails(+event.target.getAttribute('data-gif'));
    }

    // toggle favorite event
    if (event.target.classList.contains('favorite')) {
      toggleFavoriteStatus(+event.target.getAttribute('data-movie-id'));
    }
  });

  // search events
  q('input#search').addEventListener('input', (event) => {
    renderSearchItems(event.target.value);
  });

  document
    .getElementById('browse-button')
    .addEventListener('change', async () => {
      gifUpload();
    });

  await loadPage(HOME);
});
