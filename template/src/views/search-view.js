import { toMovieSimple } from './movie-views.js';

export const toSearchView = (gifsObj, searchTerm) => `
<div id="movies">
  <h1>Gifs found for "${searchTerm}":</h1>
  <div class="content">
    ${gifsObj.data.map(toMovieSimple).join('\n') || '<p>Add some movies to favorites to see them here.</p>'}
  </div>
</div>
`;
