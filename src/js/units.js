let hiding = "metric";

const UnitSlider = () => {
  return `<div class="unit d-flex align-items-center pb-3">
      <div class="celFah me-2">C</div>
      <label class="switch">
        <input type="checkbox" checked></input>
        <span class="slider round" data-id="system"></span>
      </label>
      <div class="celFah ms-2 fw-bold">F</div>
    </div>`;
};

function toggleLtrs() {
  let ltrs = document.querySelectorAll(".celFah");

  for (let i = 0; i < ltrs.length; i++) {
    ltrs[i].classList.toggle("fw-bold");
  }
}

function toggleElements() {
  let elements = document.querySelectorAll(".metric, .imperial");

  for (let i = 0; i < elements.length; i++) {
    let hidden = elements[i].getAttribute("hidden");

    if (hidden) {
      elements[i].removeAttribute("hidden");
    } else {
      elements[i].setAttribute("hidden", "hidden");
    }
  }
}

const toggleUnits = () => {
  hiding = hiding === "imperial" ? "metric" : "imperial";

  toggleLtrs();
  toggleElements();
};

function addSliderEventListener() {
  let slider = document.querySelector(".slider");
  slider.addEventListener("click", toggleUnits);
}

const setHidden = () => {
  let elements = document.querySelectorAll(`.${hiding}`);

  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute("hidden", "hidden");
  }
};

const clearHidden = () => {
  let elements = document.querySelectorAll(".metric, .imperial");

  for (let i = 0; i < elements.length; i++) {
    let hidden = elements[i].getAttribute("hidden");

    if (hidden) {
      elements[i].removeAttribute("hidden");
    }
  }
};

const unitSlider = UnitSlider();

export { unitSlider, addSliderEventListener, setHidden, clearHidden };
