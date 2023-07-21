import { FULL_HEART, EMPTY_HEART } from '../constants.js';
import { getFavorites } from '../local-storage.js';

export const simpleView = (gif) => `
<div class="gif-simple">
${renderFavoriteStatus(gif.id)}
  <a href=# class="view-button" data-gif-id="${gif.id}">
    <img class="image-display" src="${gif.images.fixed_height.url}" alt="${gif.title}" data-gif="${gif.id}">
  </a>
</div>`;

export const simpleFixedWidthView = (gif) => `
<div class="gif-simple">
${renderFavoriteStatus(gif.id)}
  <a href=# class="view-button" data-gif-id="${gif.id}">
    <img 
      class="image-display" 
      src="${gif.images['480w_still'].url}" 
      alt="${gif.title}" 
      data-gif="${gif.id}" 
      style="width: ${(gif.images['480w_still'].width)/1.5}px; height: ${(gif.images['480w_still'].height)/1.5}px;" 
      >
  </a>
</div>`;

const renderFavoriteStatus = (gifId) => {
  const favorites = getFavorites();

  return favorites.includes(gifId)
    ? `<span class="favorite active" data-gif-id="${gifId}">${FULL_HEART}</span>`
    : `<span class="favorite" data-gif-id="${gifId}">${EMPTY_HEART}</span>`;
};
