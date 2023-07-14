let hiding = "metric";

const toggleUnits = () => {
  hiding = hiding === "imperial" ? "metric" : "imperial";

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
};

const setHidden = () => {
  let elements = document.querySelectorAll(`.${hiding}`);

  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute("hidden", "hidden");
  }
};

export { toggleUnits, setHidden };
