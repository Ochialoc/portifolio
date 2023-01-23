document.addEventListener("DOMContentLoaded", function () {
  //hack to let elements in close menu not be tabbable
  let windowSize = window.innerWidth;
  console.log(windowSize);
  if (windowSize < 768) {
    document.getElementById(
      "js-main-header__navigation-container"
    ).style.display = "none";
  }
  //correct js-main-header__navigation-container
  addEventListener("resize", (event) => {
    const windowNewSize = window.innerWidth;
    if (windowNewSize > windowSize) {
      if (windowNewSize > 768) {
        document.getElementById(
          "js-main-header__navigation-container"
        ).style.display = "flex";
      }
    } else {
      if (windowNewSize < 768) {
        document
          .getElementById("js-main-header__navigation-container")
          .classList.remove("main-header__navigation-container--open");
        document.getElementById(
          "js-main-header__navigation-container"
        ).style.display = "none";
      }
    }
    windowSize = windowNewSize;
  });
  document
    .getElementById("js-main-header__menu")
    .addEventListener("click", toggleMenu);

  document
    .getElementById("js-main-header__close-menu")
    .addEventListener("click", toggleMenu);

  Array.from(
    document.getElementsByClassName("js-main-header__navigation-list-link")
  ).forEach(function (element) {
    element.addEventListener("click", closeMenuIfOpened);
  });

  document
    .getElementById("js-theme-picker")
    .addEventListener("click", toggleThemePicker);

  //close js-themes-container on click outside
  document.addEventListener("click", (event) => {
    const target = document.getElementById("js-themes-container");
    const target2 = document.getElementById("js-theme-picker");
    const elementArray = document.getElementsByClassName(
      "main-header__navigation-themes-container--visible"
    );
    const withinBoundaries = event.composedPath().includes(target);
    const withinBoundaries2 = event.composedPath().includes(target2);
    if (!withinBoundaries && !withinBoundaries2 && elementArray.length) {
      toggleThemePicker();
    }
  });

  Array.from(document.getElementsByClassName("js-theme-button")).forEach(
    function (element) {
      element.addEventListener("click", toggleTheme);
    }
  );

  Array.from(document.getElementsByClassName("js-about-me__bullet")).forEach(
    function (element) {
      element.addEventListener("click", changeBio);
    }
  );

  Array.from(
    document.getElementsByClassName("js-experience__job-select")
  ).forEach(function (element) {
    element.addEventListener("click", changeJob);
  });

  //simulate cllick on focused element
  document
    .getElementsByTagName("body")[0]
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.key === "Enter" || event.key === "Space") {
        event.target.click();
        return;
      }
      //Close stuff on esc press
      if (event.key === "Escape") {
        const themeIsOpen = document.getElementsByClassName(
          "main-header__navigation-themes-container--visible"
        ).length;
        if (themeIsOpen) {
          toggleThemePicker();
          return;
        }
        const menuIsOpen = document.getElementsByClassName(
          "main-header__navigation-container--open"
        ).length;
        console.log(menuIsOpen);
        if (menuIsOpen) {
          toggleMenu();
          return;
        }
      }
    });
});

function closeMenuIfOpened() {
  const isOpen = document.getElementsByClassName(
    "main-header__navigation-container--open"
  ).length;
  if (isOpen) {
    toggleMenu();
  }
}

function toggleMenu() {
  console.log("toggle menu");
  const display = document.getElementById(
    "js-main-header__navigation-container"
  ).style.display;
  console.log(display);
  if (display === "none") {
    document.getElementById(
      "js-main-header__navigation-container"
    ).style.display = "block";
  } else {
    setTimeout(function () {
      document.getElementById(
        "js-main-header__navigation-container"
      ).style.display = "none";
    }, 500);
  }
  setTimeout(function () {
    document
      .getElementById("js-main-header__navigation-container")
      .classList.toggle("main-header__navigation-container--open");
  }, 100);
}

function toggleTheme(event) {
  document.getElementsByTagName("body")[0].dataset.theme =
    event.target.dataset.themeSelection;
}

function toggleThemePicker() {
  document
    .getElementById("js-themes-container")
    .classList.toggle("main-header__navigation-themes-container--visible");
}

function changeBio(event) {
  document
    .getElementsByClassName("about-me__bullet--selected")[0]
    .classList.toggle("about-me__bullet--selected");
  event.target.classList.toggle("about-me__bullet--selected");
  document.getElementById("js-about-me__paragraph-container").innerHTML =
    BIO_ARRAY[event.target.dataset.bio];
}

const SHORTER_BIO = '<p class="about-me__paragraph">Oi, eu sou Felipe.</p>';
const SHORT_BIO =
  '<p class="about-me__paragraph">Oi, eu sou Felipe, formado em Ciência da Computação pela URI Erechim. Eu gosto de ler,' +
  " programar e estudar. Em geral me encontro na frente de um computador, seja a trabalho ou lazer.</p>";
const MEDIUM_BIO =
  '<p class="about-me__paragraph">Olá, sou Felipe e me formei em Ciência da Computação pela Uri Erechim. Minha rotina geralmente inclui ' +
  ' aulas de yoga, cuidar de cachorros e estudar.</p><p class="about-me__paragraph"> Quando não estou no computador, seja a trabalho, seja por lazer, ' +
  "gosto de estar com a minha família ou no centro espírita." +
  "</p>";
const LONG_BIO =
  '<p class="about-me__paragraph">Saudações, me chamo Felipe Carlotto Ochial. Nasci em Erechim - RS em Janeiro de 1994.</p> <p class="about-me__paragraph">Antes de iniciar minha tragetória na computação' +
  " cursei Engenharia Mecânica e morei 1 ano no Japão graças a uma bolsa de estudos. Porém não me encontrei na área e " +
  'decidi experimentar outro caminho.</p><p class="about-me__paragraph"> Ciência da Computação me cativou logo no começo, em 2017 quando iniciei ' +
  " minha jornada. Desde as resoluções de problemas no Uri Online Judge" +
  " até os diversos sistemas operacionais que experimentei, sempre encontrei coisas novas para aprender e cada vez mais " +
  'vejo possibilidades nesse campo.</p> <p class="about-me__paragraph">Atualmente estou trabalhando na Compass como desenvolvedor pleno.' +
  " Já programei para web, back-end, front-end, automação com bash, mobile com flutter e mais algumas aventuras que " +
  'ficaram pelo caminho. Hoje vivo com a minha namorada em nosso apartamente com nosso cachorro.</p> <p class="about-me__paragraph">Quando não estou programando, ' +
  "provavelmente estou com minha família, em aulas de yoga, no centro espírita ou comendo. Por falar em comer," +
  " sorvete e sushi são uma delícia. Mas cada um no seu tempo.</p>";
const BIO_ARRAY = [SHORTER_BIO, SHORT_BIO, MEDIUM_BIO, LONG_BIO];

function changeJob(event) {
  console.log(event.target);
  document
    .getElementsByClassName("experience__job-select--selected")[0]
    .classList.toggle("experience__job-select--selected");
  event.target.classList.toggle("experience__job-select--selected");
  document
    .getElementsByClassName(
      "experience__job-information-container--selected"
    )[0]
    .classList.toggle("experience__job-information-container--selected");
  document
    .getElementsByClassName("js-experience__job-information-container")
    [event.target.dataset.job].classList.toggle(
      "experience__job-information-container--selected"
    );
  console.log(event.target.dataset.job);
}
