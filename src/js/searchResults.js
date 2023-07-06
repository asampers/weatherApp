import { apiTermSetter } from "./api-term-setter";
import { apiCallGenerator } from "./api-call";
import {
  displayContent,
  forecastOfCity,
  weatherDisplay,
  weatherOfCity,
  futureForecast,
} from "./weatherDataDisplay";

const CitySearchResultsDisplay = () => {
  const resultsContainer = document.createElement("div");
  resultsContainer.className =
    "results d-flex justify-content-center flex-wrap";

  const populateResults = (results) => {
    results.forEach((city) => {
      const card = CityLink(city);
      resultsContainer.appendChild(card);
    });
    if (results.length == 1) resultsContainer.firstChild.click();
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
  button.className = "btn btn-outline-dark m-1";

  button.addEventListener("click", () => {
    let source = apiTermSetter(
      "forecast",
      `${city.lat}, ${city.lon}`,
      "&days=3&aqi=no&alerts=no"
    );
    apiCallGenerator(source).then((results) => {
      setBackgroundImage(results);
      weatherOfCity.update(results);
      forecastOfCity.update(results);
      futureForecast.update(results);
      displayContent.container.append(
        weatherOfCity.card,
        forecastOfCity.card,
        futureForecast.card
      );
      weatherDisplay.append(displayContent.container);
    });

    SearchResults.clear();
  });

  return button;
}

const SearchResults = CitySearchResultsDisplay();

async function setBackgroundImage(data) {
  let text = await data.current.condition.text;
  let src = text.split(" ").join("-");
  let image = await fetch(
    `https://source.unsplash.com/collection/8591375/?${src}`
  );
  let imageUrl = image.url;
  document.body.style.backgroundImage = `url(${imageUrl})`;
}

export default SearchResults;
