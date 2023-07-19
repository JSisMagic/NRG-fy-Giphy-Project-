import {
  CONTAINER,
  HOME,
  GIFS_PER_LINE,
  FAVOURITES,
  ABOUT,
  SEARCH_LIMIT,
  EMPTY_HEART,
  FULL_HEART,
  SEARCH_RESULTS_TOTAL,
  DETAILS,
  UPLOADED,
  STATUS_OK,
  CATEGORIES_CONTAINER,
} from "./constants.js";
import {
  getTrendingGifs,
  getSearchGifs,
  loadFavorites,
  getGifById,
  loadUploaded,
  getRandomGif,
  getCategories,
  getGifsByIds,
} from "./data.js";
import { simpleView } from "./views/simple-view.js";
import { homeView } from "./views/home-view.js";
import {
  favouritesView,
  favouritesEmptyView,
} from "./views/favourites-view.js";
import { searchView } from "./views/search-view.js";
import { toAboutView } from "./views/about-view.js";
import { getFavorites, addFavorite, removeFavorite } from "./local-storage.js";
import { gifDetailedView } from "./views/gif-detailed-view.js";
import { uploadedEmptyView, uploadedView } from "./views/uploaded-view.js";
import { toCategoriesView } from "./views/category-view.js";

export const loadPage = async (page = "", id) => {
  switch (page) {
    case HOME:
      setActiveNav(HOME);
      const trendingArr = await getTrendingGifs();
      renderHome(trendingArr);
      renderCategories();
      break;

    case FAVOURITES:
      setActiveNav(FAVOURITES);
      const loadedGifs = await loadFavorites();
      const gifs = loadedGifs.map((element) => element.value);
      if (gifs.length > 0) {
        renderFavourites(gifs);
      } else {
        const randomGif = await getRandomGif();
        renderFavourites([], randomGif);
      }
      break;

    case UPLOADED:
      setActiveNav(UPLOADED);
      const uploadedGifs = await loadUploaded();
      renderUploaded(uploadedGifs);
      break;

    case ABOUT:
      setActiveNav(ABOUT);
      renderAbout();
      break;

    case DETAILS:
      const gif = await getGifById(id);
      renderGifDetails(gif);
      break;

    default:
      break;
  }
};

function setActiveNav(page) {
  const navs = document.querySelectorAll(".nav-link");
  navs.forEach((element) => {
    if (element.getAttribute("data-page") === page) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

function renderHome(trendingArr) {
  const gifs = trendingArr.slice(0, GIFS_PER_LINE).map(simpleView).join("\n");
  document.querySelector(CONTAINER).innerHTML = homeView(gifs);
}

const renderCategories = async () => {
  try {
    const data = await getCategories();
    document.querySelector(CATEGORIES_CONTAINER).innerHTML =
      toCategoriesView(data);
  } catch (error) {
    console.log(error);
  }
};

function renderGifDetails(gif) {
  document.querySelector(CONTAINER).innerHTML = gifDetailedView(gif);
}

function renderFavourites(gifs, randomGif) {
  if (gifs.length > 0) {
    const gifsToRender = gifs.map(simpleView).join("\n");
    document.querySelector(CONTAINER).innerHTML = favouritesView(gifsToRender);
  } else {
    const randomGifToRender = simpleView(randomGif);
    document.querySelector(CONTAINER).innerHTML =
      favouritesEmptyView(randomGifToRender);
  }
}

function renderUploaded(gifs) {
  const gifsToRender = gifs.map(simpleView).join("\n");
  if (gifsToRender.length > 0) {
    document.querySelector(CONTAINER).innerHTML = uploadedView(gifsToRender);
  } else {
    document.querySelector(CONTAINER).innerHTML =
      uploadedEmptyView(gifsToRender);
  }
}

export const toggleFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  const heartSpan = document.querySelector(`span[data-gif-id="${gifId}"]`);
  if (favorites.includes(gifId)) {
    removeFavorite(gifId);
    heartSpan.classList.remove("active");
    heartSpan.innerHTML = EMPTY_HEART;
    if (
      document.getElementById("favourites-link").classList.contains("active")
    ) {
      loadPage(FAVOURITES);
    }
  } else {
    addFavorite(gifId);
    heartSpan.classList.add("active");
    heartSpan.innerHTML = FULL_HEART;
    if (
      document.getElementById("favourites-link").classList.contains("active")
    ) {
      loadPage(FAVOURITES);
    }
  }
};

window.gifLoading = false;

export async function renderSearchItems(searchTerm, category, offset = 0) {
  if (offset === 0) {
    document.querySelector(
      CONTAINER
    ).innerHTML = `<h2><span id="${SEARCH_RESULTS_TOTAL}"></span> results for "${searchTerm}"<h2>`;
  } else {
    document.querySelector(CONTAINER).innerHTML;
  }

  if (!window.gifLoading) {
    try {
      const gifsObj = await getSearchGifs(searchTerm, category, offset);
      const gifs = gifsObj.data.map(simpleView).join("\n");
      document.querySelector(`#${SEARCH_RESULTS_TOTAL}`).innerHTML =
        gifsObj.pagination.total_count;
      document.querySelector(CONTAINER).innerHTML += searchView(gifs);
      window.offset += SEARCH_LIMIT;
    } catch (e) {
      console.error(e);
    }
    window.gifLoading = false;
  }
}

const renderAbout = () => {
  document.querySelector(CONTAINER).innerHTML = toAboutView();
};

document.addEventListener("DOMContentLoaded", async () => {
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("nav-link")) {
      await loadPage(event.target.getAttribute("data-page"));
    }

    if (event.target.classList.contains("favorite")) {
      toggleFavoriteStatus(event.target.getAttribute("data-gif-id"));
    }

    if (event.target === document.getElementById("upload-button")) {
      document.getElementById("browse-button").click();
    }

    if (event.target.classList.contains("image-display")) {
      const id = event.target.getAttribute("data-gif");
      await loadPage(DETAILS, id);
    }
  });

  window.addEventListener("popstate", async (event) => {
    if (event.state && event.state.backButtonClicked) {
      await loadPage(HOME);
    }
  });

  document.addEventListener("click", () => {
    history.pushState({ backButtonClicked: true }, "");
  });

  document.addEventListener("input", async (event) => {
    window.searchTerm = event.target.value;
    window.offset = 0;
    const category = ""; // Set the category value based on your implementation
    await renderSearchItems(window.searchTerm, category, window.offset);
  });

  window.addEventListener("scroll", async () => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      document.getElementById("search-results-total")
    ) {
      renderSearchItems(window.searchTerm, category, window.offset);
      window.gifLoading = true;
    }
  });

  document
    .querySelector("#browse-button")
    .addEventListener("change", async () => {
      if (document.getElementById("browse-button").files[0].size > 0) {
        console.log("uploading");
        await gifUpload();
        document.getElementById("browse-button").value = "";
      } else {
        alert("Cannot upload empty file!");
      }
    });

  const gifId = "xT4uQulxzV39haRFjG";
  const gifById = await getGifById(gifId);
  console.log(gifById);

  const gifIds = ["xT4uQulxzV39haRFjG", "3og0IPxMM0erATueVW"];
  const gifsByIds = await getGifsByIds(gifIds);
  console.log(gifsByIds);

  await loadPage(HOME);
});
