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

export const toMovieSimple = (movie) => `
<div id="movie-simple">
 <h2>${movie.title}</h2>
 <p>${movie.year}</p>
 <img src="${movie.poster}" alt="movie-poster" width="200" height="auto">
 <br><span id="img-block"><a href="#" class="details-link" data-movie="${movie.id}">View details</a></span>
 ${renderFavoriteStatus(movie.id)}
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
