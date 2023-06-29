import WeatherOfCity from "./weatherOfCity";

const WeatherDataDisplay = () => {
  const container = document.createElement("div");
  container.className = "weather";
  return container;
};

const DisplayContent = () => {
  const container = document.createElement("div");

  const clear = () => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  return { container, clear };
};

const weatherDisplay = WeatherDataDisplay();
const displayContent = DisplayContent();
const weatherOfCity = WeatherOfCity();

export { weatherDisplay, displayContent, weatherOfCity };
