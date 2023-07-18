export const homeView = (gifs) => `
  <div id="home">
    <h2>Trending</h2>
    <div class="content" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
      ${gifs}
    </div>
  </div>
`;
