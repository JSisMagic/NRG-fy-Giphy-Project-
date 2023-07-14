import { toMovieSimple } from './movie-views.js';

export const toHomeView = (gifsObj) => `
<div id="home">
  <h1>Trending</h1>
  <div class="content">
  ${gifsObj.data.map(toMovieSimple).join('\n') || '<p>Add some movies to favorites to see them here.</p>'}
</div>
</div>
`;
