export const uploadedView = (gifs) =>
  `<div id="uploaded">
    <h2>Uploaded GIFs</h2>
    <div class="gifs-list">
      ${gifs}
    </div>
  </div>`;

export const uploadedEmptyView = () => {
  return '<h3>You currently have no uploaded GIFs!</h3>';
};
