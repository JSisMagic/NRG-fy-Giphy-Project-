import { toGifSimple } from './movie-views.js';

export const toFavoritesView = (gifs) => `
<div id="movies">
  <h1>Favorite gifs:</h1>
  <div class="content">
    ${gifs.map(toGifSimple).join('\n') || '<p>Add some gifs to favorites to see them here.</p>'}
  </div>
</div>
`;
