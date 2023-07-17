export const searchView = (gifs, searchTerm) =>
  `<div id="search">
    <h2>Search results for ${searchTerm}:</h2>
    <div>
      ${gifs}
    </div>
  </div>`;
