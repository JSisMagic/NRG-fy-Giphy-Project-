export const homeView = (gifs, name) => `
  <div id="home">
    <h2>${name}</h2>
    <div class="content" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
      ${gifs}
    </div>
  </div>
`;
