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
    element.addEventListener("click", toggleMenu);
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

  document.getElementById("js-about-me__bio-paragraph").innerText =
    BIO_ARRAY[1];

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

function toggleMenu() {
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
  document.getElementById("js-about-me__bio-paragraph").innerText =
    BIO_ARRAY[event.target.dataset.bio];
}

const SHORTER_BIO = "Oi, sou Felipe. Eu tento todo dia o meu melhor.";
const SHORT_BIO =
  "Oi, sou Felipe, formado em Ciência da Computação pela URI Erechim. Eu gosto de ler," +
  " programar e estudar. Em geral me encontro na frente de um computador, seja a trabalho ou lazer.";
const MEDIUM_BIO =
  "Olá, sou Felipe e me formei em Ciência da Computação pela Uri Erechim. Minha rotina geralmente inclui " +
  " aulas de yoga, cuidar de cachorros e estudar. Quando não estou no computador, seja a trabalho, seja por lazer, " +
  "gosto de estar com a minha família ou no centro espirita. Gosto bastante de sorvete de creme." +
  " Pelo meu peso talvez até demais.";
const LONG_BIO =
  "Saudações, me chamo Felipe Carlotto Ochial. Nasci em Erechim - RS em Janeiro de 1994. Antes de iniciar minha tragetória na computação" +
  " cursei Engenharia Mecânica e morei 1 ano no Japão em uma bolsa de estudos. Porám não me encontrei na área e " +
  "decidi experimentar outro caminho. Ciência da Computação me cativou desde o começo, quando em 2017 iniciei " +
  " minha jornada. Desde as resoluções de problemas no Uri Online Judge" +
  " até os diversos sistemas operacionais que experimentei, sempre encontrei coisas novas para aprender e cada vez " +
  "vejo mais possibilidades nesse campo. Atualmente estou trabalhando na Compass como desenvolvedor pleno." +
  " Já programei Web, Back-End, Front-End, automação com Bash, mobile com Flutter e mais algumas aventuras que " +
  "ficaram pelo caminho. Hoje vivo com a minha namorada em nosso apartamente com nosso cachorro. Quando não estou programando, " +
  "provavelmente estou ou com minha família, ou em aulas de yoga, ou no centro Espirita ou comendo. Por falar em comer," +
  " sorvete e sushi são uma delícia. Mas cada um no seu tempo, apesar que talvez um temaki de sorvete de creme possa surpreender.";
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
