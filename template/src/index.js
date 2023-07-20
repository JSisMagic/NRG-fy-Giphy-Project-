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

/**
 * Event listener function that listens for the 'DOMContentLoaded' event, triggered when the initial HTML document has been completely loaded and parsed.
 *
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when the Home page is loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Click event listener function
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

  /**
 * Event listener function that listens for the 'popstate' event, triggered when the browser's history changes.
 *
 * @function
 * @param {PopStateEvent} event - The 'popstate' event object.
 * @returns {Promise<void>} A Promise that resolves when the Home page is loaded (if needed).
 */
  window.addEventListener('popstate', async (event) => {
    if (event.state && event.state.backButtonClicked) {
      await loadPage(HOME);
    }
  });

  /**
 * Event listener function that listens for a 'click' event and pushes a new state to the browser's history.
 *
 * @function
 * @returns {void}
 */
  document.addEventListener('click', () => {
    history.pushState({ backButtonClicked: true }, '');
  });

  // search events

  /**
 * Event listener function that listens for an 'input' event on the search input element.
 *
 * @function
 * @param {Event} event - The 'input' event object.
 * @returns {Promise<void>} A Promise that resolves when the search items are rendered.
 */
  document
    .querySelector('input#search')
    .addEventListener('keypress', async (event) => {
      if (event.key === 'Enter') {
        window.searchTerm = event.target.value;
        window.offset = 0;

        await renderSearchItems(window.searchTerm, window.offset);
      }
    });

  /**
 * Event listener function that listens for a 'scroll' event on the window.
 *
 * @function
 * @returns {void}
 */
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

  /**
 * Event listener function that listens for a 'change' event on the input element with the ID 'browse-button'.
 *
 * @function
 * @returns {void}
 */
  document
    .querySelector('#browse-button')
    .addEventListener('change', async () => {
      if (document.getElementById('browse-button').files[0].size > 0) {
        console.log('uploading');
        await gifUpload();
        document.getElementById('browse-button').value = '';
      } else {
        alert('Cannot upload empty file!');
      }
    });

  /**
 * Event listener function that listens for a 'click' event on the modal element.
 *
 * @function
 * @returns {void}
 */
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('myModal');
    if (!(e.target.classList.contains('image-display'))) {
      modal.style.display = 'none';
    }
  });

  await loadPage(HOME);
});
