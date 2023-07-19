export const toCategoriesView = (categories) => `
<div id="categories">
  <h1 class="section-name" data-section-name="home">Categories</h1>
  <div>
    <div class="categories-content">
      ${categories.map(toSingleCategoryView).join("\n")}
    </div>
  </div>
</div>
`;

const toSingleCategoryView = (category) => `
<div class="category-main">
  <a href="#" class="category-btn" data-category="${category.name.toLowerCase()}">
    <img class="category-img" data-category="${category.name.toLowerCase()}"
      src="${category.gif.images.preview_gif.url}" alt="">
    <h1 class="category-title" data-category="${category.name.toLowerCase()}">
      ${category.name}
    </h1>
  </a>
</div>
`;
