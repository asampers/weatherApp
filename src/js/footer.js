const Footer = () => {
  return `<nav class="container rounded-top mx-auto pb-3 d-flex justify-content-between">
    <div>
      <a href="https://github.com/asampers/weatherApp/tree/main" class="d-flex justify-content-center align-items-center link-dark text-decoration-none pb-2">
        <ion-icon name="logo-github"></ion-icon>  
        <span class="ps-2">Made by Anna Sampers</span>
      </a>
    </div >

    <button class="popup pt-0 me-4 btn btn-sm">
      <ion-icon name="document-text-outline"></ion-icon>
      <span class="ps-1">Credits</span>
      <span class="popuptext d-flex flex-column" id="myPopup">
        <div>Icons made by<a class="link-light" href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect</a>,</div>
        <div>and<a class="link-light" href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev"> Vitaly Gorbachev</a>,</div>
        <div>and<a class="link-light" href="https://www.flaticon.com/authors/mehwish" title="Mehwish"> Mehwish</a>.</div>
        <div>Clock icons created by<a class="link-light" href="https://www.flaticon.com/free-icons/clock" title="clock icons"> CreativeCons</a>.</div>
        <div>Time and date icons created by<a class="link-light" href="https://www.flaticon.com/free-icons/time-and-date" title="time and date icons"> Abbasi</a>.</div>
        <div>Powered by <a class="link-light" href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>.</div>
      </span>
    </button>
  </nav>`;
};

function toggleShow() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function addPopupEventListener() {
  let toggle = document.querySelector(".popup");
  toggle.addEventListener("click", toggleShow);
}

const footer = Footer();

export { footer, addPopupEventListener };
