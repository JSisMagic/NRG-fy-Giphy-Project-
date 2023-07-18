import { loadPage, renderSearchItems } from './components/engine.js';
import {
  HOME,
  FULL_HEART,
  EMPTY_HEART,
  SEARCH_RESULTS_TOTAL,
  DETAILS,
} from './components/constants.js';
import { toggleFavoriteStatus } from './components/engine.js';
import { gifUpload } from './components/data.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('nav-link')) {
      await loadPage(event.target.getAttribute('data-page'));
    }

    if (event.target.classList.contains('favorite')) {
      toggleFavoriteStatus(event.target.getAttribute('data-gif-id'));
    }

    if (event.target === document.getElementById('upload-button')) {
      document.getElementById('browse-button').click();
    }

    if (event.target.classList.contains('image-display')) {
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
  document
    .querySelector('input#search')
    .addEventListener('input', async (event) => {
      window.searchTerm = event.target.value;
      window.offset = 0;

      await renderSearchItems(window.searchTerm, window.offset);
    });

  window.addEventListener('scroll', () => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      document.getElementById('search-results-total')
    ) {
      renderSearchItems(window.searchTerm, window.offset);
      window.gifLoading = true;
    }
  });

  document
    .querySelector('#browse-button')
    .addEventListener('change', async () => {
      if (document.getElementById('browse-button').files[0].size > 0) {
        console.log('uploading');
        await gifUpload();
        document.getElementById('browse-button').files = [];
      } else {
        alert('Cannot upload empty file!');
      }
    });


  await loadPage(HOME);
});
