import { CONTAINER_SELECTOR } from '../common/constants.js';
import { loadTrending } from '../requests/request-service.js';
import { toHomeView } from '../views/home-view.js';
import { toSearchView } from '../views/search-view.js';
import { q } from './helpers.js';

export const renderTrending = async () => {

  try {
    const gifsObj = await loadTrending();
    q(CONTAINER_SELECTOR).innerHTML = toHomeView(gifsObj);
  } catch (e) {
    console.error(e);
  }
};
