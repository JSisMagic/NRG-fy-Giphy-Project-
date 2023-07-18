let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs")) || [];


export const addFavorite = (gifId) => {
  if (favorites.find(id => id === gifId)) {
    // Gif has already been added to favorites
    return;
  }

  favorites.push(gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (gifId) => {
  favorites = favorites.filter(id => id !== gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const addUploaded = gifId => {
  if (uploadedGifs.find(id => id === gifId)) {
    return;
  }
  uploadedGifs.push(gifId);
  localStorage.setItem("uploadedGifs", JSON.stringify(uploadedGifs));
};


export const getUploaded = () => [...uploadedGifs];
export const getFavorites = () => [...favorites];
