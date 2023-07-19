let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs')) || [];

export const manageFavorite = {
  /**
   * Adds a GIF with the specified ID to the list of favorites, if it's not already present.
   * @function
   * @param {string} gifId - The ID of the GIF to be added as a favorite.
   * @return {void}
   */
  addFavorite(gifId) {
    if (favorites.find(id => id === gifId)) {
      // Gif has already been added to favorites
      return;
    }

    favorites.push(gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },

  /**
   * Removes a GIF with the specified ID from the list of favorites.
   * @function
   * @param {string} gifId - The ID of the GIF to be removed from favorites.
   * @return {void}
   */
  removeFavorite(gifId) {
    favorites = favorites.filter(id => id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },
};

/**
 * Adds a GIF with the specified ID to the list of uploaded GIFs, if it's not already present.
 * @function
 * @param {string} gifId - The ID of the GIF to be added to the list of uploaded GIFs.
 * @return {void}
 */
export const addUploaded = gifId => {
  if (uploadedGifs.find(id => id === gifId)) {
    return;
  }
  uploadedGifs.push(gifId);
  localStorage.setItem('uploadedGifs', JSON.stringify(uploadedGifs));
};


export const getUploaded = () => [...uploadedGifs];
export const getFavorites = () => [...favorites];
