import { apiTermSetter } from "./api-term-setter";
import { apiCallGenerator } from "./api-call";
import {
  displayContent,
  forecastOfCity,
  weatherDisplay,
  weatherOfCity,
  futureForecast,
} from "./weatherDataDisplay";
import { setHidden } from "./units";

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

    if (results.length == 0) displayError();
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
      setHidden();
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

function displayError() {
  const error = document.createElement("div");
  error.className = "alert alert-primary fade show d-flex align-items-center";
  error.innerHTML =
    "<ion-icon class='me-3' name='thunderstorm-outline'></ion-icon><p class='text-center me-3 m-auto'>I'm unfamiliar with that city.<br>Please try again.</p><ion-icon name='sunny-outline'></ion-icon>";
  setTimeout(function () {
    error.classList.toggle("show");
    setTimeout(function () {
      error.remove();
    }, 500);
  }, 10000);

  SearchResults.resultsContainer.append(error);
}

export default SearchResults;
