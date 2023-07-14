import { renderFavoriteStatus } from '../events/favorites-events.js';

export const toMoviesFromCategoryView = (category, movies) => `
<div id="movies">
  <h1>${category.name} movies:</h1>
  <div class="content">
    ${movies.map(toMovieSimple).join('\n')}
  </div>
</div>
`;

export const toSingleMovieView = (movie) => `
<div>${toMovieDetailed(movie)}</div>
`;

/* <h2>${movie.title}</h2>
 <p>${movie.year}</p> */
//  <span id="img-block"><a href="#" class="details-link" data-movie="${movie.id}">View details</a></span>
//  ${renderFavoriteStatus(movie.id)}
export const toMovieSimple = (gif) => `
<div id="movie-simple">
<img src="${gif.images.fixed_height.url}" alt="gif-small">
<br>
</div>
`;

const toMovieDetailed = (movie) => `
<h1>${movie.title}(${movie.year})</h1>
<div class="movie-detailed-container">
  <img src="${movie.poster}" alt="image-${movie.title}"/>
  <div class="movie-info-container">
    <div>Genre: ${movie.genre}</div>
    <div>Director: ${movie.director}</div>
    <div>Staring: ${movie.stars.map(star=>star).join(', ')}</div>
    <div>Plot: ${movie.description}</div>
  </div>
</div>
`;
