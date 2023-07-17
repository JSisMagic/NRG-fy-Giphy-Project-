export const favouritesView = (gifs) =>
  `<div id="favourites">
    <h2>Favourite GIFs</h2>
    <div class="gifs-list">
      ${gifs}
    </div>
  </div>`;

export const favouritesEmptyView = () => {
  return '<h3>You currently have no favourite GIFs!</h3>';
};
