import { loadSearchGifs } from '../requests/request-service.js';
import { toSearchView } from '../views/search-view.js';
import { q } from './helpers.js';
import { SEARCH_LIMIT, SEARCH_RESULTS_TOTAL } from '../common/constants.js';

window.searchTerm = '';
window.offset = 0;
window.gifLoading = false;

export const renderSearchItems = async (searchTerm, offset = 0) => {

  if (!window.gifLoading) {

    try {
      const gifsObj = await loadSearchGifs(searchTerm, offset);
      q(`#${SEARCH_RESULTS_TOTAL}`).innerHTML = gifsObj.pagination.total_count;
      toSearchView(gifsObj, searchTerm);

      window.offset += SEARCH_LIMIT;

    } catch (e) {
      console.error(e);
    }

    window.gifLoading = false;
  }
}
