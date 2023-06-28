// Import our custom CSS
import "../scss/styles.scss";
import SearchBar from "./form";

const searchbar = SearchBar();
const display = document.querySelector(".container");
display.append(searchbar);
