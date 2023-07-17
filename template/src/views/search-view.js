import { CONTAINER_SELECTOR } from '../common/constants.js';
import { q } from '../events/helpers.js';
// import { renderFavoriteStatus } from '../events/favorites-events.js';
import { toGifSimple } from './movie-views.js';

export const toSearchView = (gifsObj) => {

  const container = q(CONTAINER_SELECTOR);
 
  gifsObj.data.forEach((e) => {
    container.innerHTML += toGifSimple(e);
    // const div = document.createElement('div');
    // div.classList.add('movie-simple');
    // const img = document.createElement('img');
    // img.src = `${e.images.fixed_height.url}`;
    // img.classList.add('image-display');
    // img.alt = `${e.title}`;
    // img.setAttribute('data-gif', e.id)
    // div.appendChild(img);
    // container.appendChild(div);
  });
};
