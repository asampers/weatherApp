import { apiCallGenerator } from "./api-call";
import { apiTermSetter } from "./api-term-setter";
import SearchResults from "./searchResults";
import { displayContent } from "./weatherDataDisplay";
import { clearHidden } from "./units";

const SearchBar = () => {
  const form = document.createElement("form");
  form.className = "search-form needs-validation";

  const searchDiv = document.createElement("div");
  searchDiv.className = "input-group mb-3";

  const searchbar = document.createElement("input");
  searchbar.className = "form-control";
  searchbar.setAttribute("type", "text");
  searchbar.setAttribute("name", "searchbar");
  searchbar.setAttribute("placeholder", "Search for city by NAME or ZIP CODE");
  searchbar.required = true;

  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.textContent = "Go";
  submit.className = "btn btn-dark";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let value = searchbar.value;
    let source = apiTermSetter("search", value, "");
    apiCallGenerator(source).then((results) => {
      displayContent.clear();
      SearchResults.clear();
      SearchResults.populateResults(results);
    });

    form.reset();
    clearHidden();
  });

  searchDiv.append(searchbar, submit);
  form.appendChild(searchDiv);

  return form;
};

export default SearchBar;
