export const toCategoriesView = (categories) => `
<div id="categories">
  <h1>Categories</h1>
  <div class="content">
    ${categories.map(toSingleCategoryView).join('\n')}
  </div>
</div>
`;

const toSingleCategoryView = (category) =>
  `<div class="single-category">
  <h1 class="h1style">${category.name}</h1>
  <p class="movies-count">${category.moviesCount} movies</p>
  <button type="button" class="btn" data-category="${category.id}">View category</button>
  </div>`
  ;
