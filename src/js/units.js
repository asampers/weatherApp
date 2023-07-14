let system = "imperial";
let wind;
let temp;
let windUnit;
let tempUnit;

if (system === "imperial") {
  wind = "wind_mph";
  temp = "temp_f";
  windUnit = "mph";
  tempUnit = "F";
} else {
  wind = "wind_kph";
  temp = "temp_c";
  windUnit = "kph";
  tempUnit = "C";
}

const toggleUnits = () => {
  system = system === "imperial" ? "metric" : "imperial";

  let ltrs = document.querySelectorAll(".celFah");

  for (let i = 0; i < ltrs.length; i++) {
    ltrs[i].classList.toggle("fw-bold");
  }
  let elements = document.querySelectorAll(".metric, .imperial");

  for (let i = 0; i < elements.length; i++) {
    let hidden = elements[i].getAttribute("hidden");

    if (hidden) {
      elements[i].removeAttribute("hidden");
    } else {
      elements[i].setAttribute("hidden", "hidden");
    }
  }

  console.log(system);
};

export { toggleUnits };
