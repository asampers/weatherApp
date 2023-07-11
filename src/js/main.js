// Import our custom CSS
import "../scss/styles.scss";
import SearchBar from "./form";
import SearchResults from "./searchResults";
import { weatherDisplay } from "./weatherDataDisplay";
import { addPopupEventListener, footer } from "./footer";

const searchbar = SearchBar();
const display = document.querySelector(".container");
const citySearchResults = SearchResults.resultsContainer;

display.append(searchbar, citySearchResults, weatherDisplay);
display.insertAdjacentHTML("afterend", footer);
addPopupEventListener();

export { searchbar };
