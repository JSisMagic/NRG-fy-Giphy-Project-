import {
  HOME,
  DETAILS,
  CONTAINER_SELECTOR,
  SEARCH_RESULTS_TOTAL,
} from './src/common/constants.js';
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
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
    }

    if (event.target.classList.contains('view-button')) {
      const id = event.target.getAttribute('data-gif');
      await loadPage(DETAILS, id);
    }
  });

  window.addEventListener('popstate', async (event) => {
    if (event.state && event.state.backButtonClicked) {
      await loadPage(HOME);
    }
  });

  document.addEventListener('click', () => {
    history.pushState({ backButtonClicked: true }, '');
  });

  // search events
  q('input#search').addEventListener('input', (event) => {
    window.searchTerm = event.target.value;
    const container = q(CONTAINER_SELECTOR);
    container.innerHTML = `<h1><span id="${SEARCH_RESULTS_TOTAL}"></span> results for "${window.searchTerm}"<h1>`;
    renderSearchItems(event.target.value, 0);
  });

  window.addEventListener('scroll', () => {

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
      document.getElementById('search-results-total')) {
      renderSearchItems(window.searchTerm, window.offset);
      window.gifLoading = true;
    }
  });

  document
    .getElementById('browse-button')
    .addEventListener('change', async () => {
      gifUpload();
    });

  await loadPage(HOME);
});
