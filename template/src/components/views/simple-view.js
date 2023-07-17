import { FULL_HEART, EMPTY_HEART } from '../constants.js';

export const simpleView = (gif) => `
  <div class="gif-simple">
  <img class="image-display" src="${gif.images.fixed_height.url}" alt="${gif.title}" data-gif="${gif.id}">
  <div class="details-link"><p class="view-details" data-gif-id="${
    gif.id
  }">View Details</p></div>
  <a href="#" class="fav-button" data-gif-id="${gif.id}">${EMPTY_HEART}</a>
</div>`;

export const simpleViewFav = (gif) => `
  <div class="gif-simple">
  <img class="gif-image" src=${gif.images.fixed_width.url} alt=${
  gif.title
} width=${+gif.images.fixed_width.width + 90} height=${
  +gif.images.fixed_width.height + 90
}>
  <div class="details-link"><p class="view-details" data-gif-id="${
    gif.id
  }">View Details</p></div>
  <a href="#" class="fav-button" id="in-favourites" data-gif-id="${
    gif.id
  }">${FULL_HEART}</a>
</div>`;
