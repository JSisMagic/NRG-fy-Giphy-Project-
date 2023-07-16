import { toMovieSimple } from './movie-views.js';

export const toHomeView = (gifsObj, numberOfGifsPerLine = 50) => `
  <div id="home">
    <h1>Trending</h1>
    <div class="content" style="display: flex; flex-wrap: nowrap; overflow-x: auto;" id="gifContainer">
      ${gifsObj.slice(0, numberOfGifsPerLine).map(toMovieSimple).join('\n')}
    </div>
  </div>
`;
{/* <script>
const gifContainer = document.getElementById('gifContainer');
let loadedGifs = ${numberOfGifsPerLine};


  const moreGifs = loadTrending();
  loadedGifs += moreGifs;

  gifContainer.innerHTML += moreGifs.map(toMovieSimple).join('');
};

// Infinite scrolling event listener
gifContainer.addEventListener('scroll', () => {
  const containerWidth = gifContainer.offsetWidth;
  const scrollWidth = gifContainer.scrollWidth;
  const scrollPosition = gifContainer.scrollLeft;

  // Load more gifs when the user reaches near the end (adjust 50 to a suitable value for your case)
  if (scrollWidth - scrollPosition - containerWidth < 10) {
    fetchMoreGifs();
  }
});
</script> */}
