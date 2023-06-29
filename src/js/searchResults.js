import { apiTermSetter } from "./api-term-setter";
import { apiCallGenerator } from "./api-call";
import {
  displayContent,
  weatherDisplay,
  weatherOfCity,
} from "./weatherDataDisplay";

const CitySearchResultsDisplay = () => {
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "results d-flex justify-content-center";

  const populateResults = (results) => {
    results.forEach((city) => {
      const card = CityLink(city);
      resultsContainer.appendChild(card);
    });
  };

  const clear = () => {
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
  };

  return { resultsContainer, populateResults, clear };
};

function CityLink(city) {
  const button = document.createElement("button");
  button.textContent = `${city.name}, ${city.region}`;
  button.className = "btn btn-outline-info m-1";

  button.addEventListener("click", () => {
    let source = apiTermSetter(
      "forecast",
      `${city.lat}, ${city.lon}`,
      "&days=3&aqi=no&alerts=no"
    );
    apiCallGenerator(source).then((results) => {
      weatherOfCity.update(results);
      displayContent.container.appendChild(weatherOfCity.card);
      weatherDisplay.append(displayContent.container);
    });

    SearchResults.clear();
  });

  return button;
}

const SearchResults = CitySearchResultsDisplay();

export default SearchResults;
