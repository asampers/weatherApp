// Import our custom CSS
import "../scss/styles.scss";
import SearchBar from "./form";
import SearchResults from "./searchResults";
import { weatherDisplay } from "./weatherDataDisplay";
import Footer from "./footer";

const searchbar = SearchBar();
const display = document.querySelector(".container");
const citySearchResults = SearchResults.resultsContainer;

let footer = Footer();

display.append(searchbar, citySearchResults, weatherDisplay);
footer.addFoot();

let toggle = document.querySelector(".popup");

function myFunction() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

toggle.addEventListener("click", myFunction);

export { searchbar };
