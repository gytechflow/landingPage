(function () {
  "use strict";

  var carousels = function () {
    $(".owl-carousel1").owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 1,
          nav: false,
        },
        1000: {
          items: 3,
          nav: true,
          loop: false,
        },
      },
    });

    $(".owl-carousel2").owlCarousel({
      loop: true,
      center: false,
      margin: 0,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 2,
          nav: false,
        },
        1000: {
          items: 3,
          nav: true,
          loop: true,
        },
      },
    });
  };

  // svg responsive in mobile mode
  var checkPosition = function () {
    if ($(window).width() < 767) {
      $("#bg-services").attr("viewBox", "0 0 1050 800");
    }
  };

  (function ($) {
    carousels();
    checkPosition();
  })(jQuery);
})();

// menu toggle button
function myFunction(x) {
  x.classList.toggle("change");
}

const outlet = document.querySelector("#content-outlet");
const language = _getLanguage(document.URL);
const router = new Router(outlet);
router
  .register("", {
    component: HomeComponent,
    templateUrl: "../components/home/home.html",
  })
  .register("about", {
    component: AboutComponent,
    templateUrl: "../components/aboutUs/about.html",
  })
  .register("portfolio", {
    component: PortfolioComponent,
    templateUrl: "../components/portfolio/portfolio.html",
  })
  .register("services", {
    component: ServicesComponent,
    templateUrl: "../components/services/services.html",
  })
  .register("blog", {
    component: BlogComponent,
    templateUrl: "../components/blog/blog.html",
  });

changeLanguage(language);

// Function to change language
async function changeLanguage(lang) {
  _setLanguagePreference(lang);

  const langData = await _fetchLanguageData(lang);
  _updateContent(langData);
}

// Function to update content based on selected language
function _updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (langData[key].split("|").length === 2) {
      element.innerHTML = langData[key].split("|")[0];
    } else {
      element.textContent = langData[key];
    }
  });
}

// Function to set the language preference
function _setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
}
// Function to fetch language data
async function _fetchLanguageData(lang) {
  const response = await fetch(`/languages/${lang}.json`);
  return response.json();
}

// Call _updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = _fetchLanguageData(userPreferredLanguage);
  _updateContent(langData);
});

function _getLanguage(url) {
  return url.split("/")[3]; //|| "en"
}
