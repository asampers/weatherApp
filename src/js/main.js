// Import our custom CSS
import "../scss/styles.scss";
import SearchBar from "./form";
import SearchResults from "./searchResults";
import { weatherDisplay } from "./weatherDataDisplay";

const searchbar = SearchBar();
const display = document.querySelector(".container");
const citySearchResults = SearchResults.resultsContainer;

display.append(searchbar, citySearchResults, weatherDisplay);

let toggle = document.querySelector(".popup");

function myFunction() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

toggle.addEventListener("click", myFunction);

export { searchbar };
