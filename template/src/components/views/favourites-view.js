import { EMPTY_HEART } from "../constants.js";

export const favouritesView = (gifs) =>
  `<div id="favourites">
    <h2>Favourite GIFs</h2>
    <div class="gifs-list">
      ${gifs}
    </div>
  </div>`;

export const favouritesEmptyView = (randomGif) => {
  return `<h3>You currently have no favourite GIFs!<br> Here\'s a random GIF!<br>
  To add it to favourites hover the GIF and click the ${EMPTY_HEART}</h3>
  <div class="gifs-list">
    ${randomGif}
  </div>`
};
