export const homeView = (gifs) => `
  <div id="home">
    <h1>Trending</h1>
    <div class="content" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
      ${gifs}
    </div>
  </div>
`;
