// Import our custom CSS
import "../scss/styles.scss";
import SearchBar from "./form";
import SearchResults from "./searchResults";
import { weatherDisplay } from "./weatherDataDisplay";
import { addPopupEventListener, footer } from "./footer";
import { toggleUnits } from "./units";

const title = document.createElement("h1");
title.className = "text-center";
title.textContent = "What's the Weather?";

const searchbar = SearchBar();
const display = document.querySelector(".container");
const citySearchResults = SearchResults.resultsContainer;

display.append(title, searchbar, citySearchResults, weatherDisplay);
display.insertAdjacentHTML("afterend", footer);
addPopupEventListener();

const slider = document.querySelector(".slider");
slider.addEventListener("click", toggleUnits);

export { searchbar };
