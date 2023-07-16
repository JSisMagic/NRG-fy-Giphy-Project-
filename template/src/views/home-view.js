import { toGifSimple } from './movie-views.js';

export const toHomeView = (gifsObj, numberOfGifsPerLine = 50) => `
  <div id="home">
    <h1>Trending</h1>
    <div class="content" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
      ${gifsObj.slice(0, numberOfGifsPerLine).map(toGifSimple).join('\n')}
    </div>
  </div>
`;