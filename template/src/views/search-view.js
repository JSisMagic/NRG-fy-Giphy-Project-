import { CONTAINER_SELECTOR } from '../common/constants.js';
import { q } from '../events/helpers.js';

export const toSearchView = (gifsObj) => {

  const container = q(CONTAINER_SELECTOR);
 
  gifsObj.data.forEach((e) => {
    const div = document.createElement('div');
    div.classList.add('movie-simple');
    const img = document.createElement('img');
    img.src = `${e.images.fixed_height.url}`;
    img.classList.add('image-display');
    div.appendChild(img);
    container.appendChild(div);
  });
};
