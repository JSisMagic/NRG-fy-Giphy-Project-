import { EMPTY_HEART } from '../constants.js';

export const favouritesView = (gifs1, gifs2, gifs3, gifs4, pageTitle) =>
  `<div id="${pageTitle}">
    <h2>${pageTitle}:</h2>
    <div id="column-separator">
      <div id="column1" class="column">
      ${gifs1}
      </div>
      <div id="column2" class="column">
      ${gifs2}
      </div>
      <div id="column3" class="column">
      ${gifs3}
      </div>
      <div id="column4" class="column">
      ${gifs4}
      </div>
    </div>
  </div>`;

export const favouritesEmptyView = (randomGif) => {
  return `<h3>You currently have no favourite GIFs!<br> Here\'s a random GIF!<br>
  To add it to favourites hover the GIF and click the ${EMPTY_HEART}</h3>
  <div class="gifs-list">
    ${randomGif}
  </div>`;
};
