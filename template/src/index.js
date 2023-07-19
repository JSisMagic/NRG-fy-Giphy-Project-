import {
  loadPage,
  toggleFavoriteStatus,
  renderSearchItems,
} from "./components/engine.js";
import {
  HOME,
  FULL_HEART,
  EMPTY_HEART,
  SEARCH_RESULTS_TOTAL,
  DETAILS,
} from "./components/constants.js";
import { gifUpload, getGifById, getGifsByIds } from "./components/data.js";

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
    if (
      event.target.classList.contains("category-img") ||
      event.target.classList.contains("category-title")
    ) {
      event.preventDefault();
      const category = "";
      renderSearchItems(event.target.getAttribute("data-category"), category);
      document.querySelector("input#search").value =
        event.target.getAttribute("data-category");
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

  // Get GIF by ID
  const gifId = "xT4uQulxzV39haRFjG";
  const gifById = await getGifById(gifId);
  console.log(gifById);

  // Get GIFs by ID
  const gifIds = ["xT4uQulxzV39haRFjG", "3og0IPxMM0erATueVW"];
  const gifsByIds = await getGifsByIds(gifIds);
  console.log(gifsByIds);

  await loadPage(HOME);
});
