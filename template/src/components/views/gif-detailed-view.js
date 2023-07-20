export const gifDetailedView = (gif, simpleViewGif) => `
  <div class="details-container">
    <div class="image-container">
      ${simpleViewGif}
    </div>
    <div class="description-container">
      <ul>
        <p>${gif.title || '-'} (${gif.import_datetime})</p>
        <br />
        <p>More about the artist:</p>
        <img id="avatar" src="${gif.user && gif.user.avatar_url ? gif.user.avatar_url : ''}">
        <p>${gif.username || 'unknown'}<p>
        <p>${gif.user && gif.user.description ? gif.user.description : ''}</p>
        <p>${gif.user && gif.user.profile_url ? `<a href="${gif.user.profile_url}">Giphy</a>` : ''}</p>
        <p>${gif.user && gif.user.instagram_url ? `<a href="${gif.user.instagram_url}">Instagram</a>` : ''}</p>
        <p>${gif.user && gif.user.website_url ? `<a href="${gif.user.website_url}">Website</a>` : ''}</p>
      </ul>
    </div>
  </div>
`;
