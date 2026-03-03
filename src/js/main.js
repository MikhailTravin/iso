window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav__local');
  const addressBlock = e.target.closest('.nav__address');

  // Закрыть все списки, если клик вне
  if (!addressBlock) {
    document.querySelectorAll('.nav__address-list.active')
      .forEach(list => list.classList.remove('active'));
    return;
  }

  // Клик по заголовку
  if (toggle) {
    const list = addressBlock.querySelector('.nav__address-list');

    // закрываем все остальные
    document.querySelectorAll('.nav__address-list.active')
      .forEach(l => {
        if (l !== list) l.classList.remove('active');
      });

    list.classList.toggle('active');
  }

  // Клик по адресу
  if (e.target.tagName === 'LI') {
    const current = addressBlock.querySelector('.nav__address-current');
    current.textContent = e.target.textContent;

    addressBlock
      .querySelector('.nav__address-list')
      .classList.remove('active');
  }
});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('a.btn').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.local__info_1').click(function (e) {
    e.preventDefault();
    $('#popup-local1').arcticmodal({
    });
  });
  $('.local__info_2').click(function (e) {
    e.preventDefault();
    $('#popup-local2').arcticmodal({
    });
  });
  $('.local__info_3').click(function (e) {
    e.preventDefault();
    $('#popup-local3').arcticmodal({
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs2');
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 5,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 5,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 5,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 5,
        slidesPerView: 1
      }
    }
  });
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    },
    on: {
      slideChangeTransitionEnd() {
        AOS.refreshHard();
      }
    }
  });
  const swiper23 = new Swiper('.swiper23', {
    slidesPerView: 1.05,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1.05
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    },
    on: {
      slideChangeTransitionEnd() {
        AOS.refreshHard();
      }
    }
  });
  function initSwiper24() {
    if (window.innerWidth <= 1200) {

      if (!window.swiper24Instance) {
        window.swiper24Instance = new Swiper('.swiper25', {
          slidesPerView: 'auto',
          spaceBetween: 10,
          on: {
            slideChangeTransitionEnd() {
              AOS.refreshHard();
            }
          }
        });
      }
    } else {
      if (window.swiper24Instance) {
        window.swiper24Instance.destroy(true, true);
        window.swiper24Instance = null;
      }
    }
  }
  initSwiper24();
  window.addEventListener('resize', () => {
    initSwiper24();
  });
  const swiperContainers = document.querySelectorAll('.swiper24');

  swiperContainers.forEach((container, index) => {
    const paginationElement = container.querySelector('.main2__pagination');
    if (paginationElement) {
      new Swiper(container, {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: paginationElement,
          clickable: true,
        },
        on: {
          slideChangeTransitionEnd() {
            if (typeof AOS !== 'undefined' && AOS.refreshHard) {
              AOS.refreshHard();
            }
          }
        }
      });
    }
  });
  const swiper22 = new Swiper('.swiper22', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next22',
      prevEl: '.swiper-button-prev22',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      }
    }
  });
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 2,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2,
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 10,
        slidesPerView: 4,
        allowTouchMove: false,   // ❌ тач
        simulateTouch: false,    // ❌ мышь
      }
    }
  });
  const swiper44 = new Swiper('.swiper44', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next44',
      prevEl: '.swiper-button-prev44',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2,
      }
    }
  });
  const swiper6 = new Swiper('.swiper6', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next6',
      prevEl: '.swiper-button-prev6',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 1,
        allowTouchMove: true,
        simulateTouch: true,
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3,
        allowTouchMove: true,
        simulateTouch: true,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 4,
      }
    }
  });
  const swiper7 = new Swiper('.swiper7', {
    slidesPerView: 2,
    spaceBetween: 12,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 12,
        slidesPerView: 2
      }
    }
  });
  const swiper8 = new Swiper('.swiper8', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next8',
      prevEl: '.swiper-button-prev8',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });
  const swiper9 = new Swiper('.swiper9', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next9',
      prevEl: '.swiper-button-prev9',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1300: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1302: {
        spaceBetween: 20,
        slidesPerView: 3
      },
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {

  let swiper5 = null;
  let currentMode = null; // 'desktop' | 'mobile'

  const isDesktop = () => window.innerWidth >= 1200;

  /* =========================
     INIT / DESTROY
  ========================== */

  function initSwiper(force = false) {
    const mode = isDesktop() ? 'desktop' : 'mobile';
    if (!force && currentMode === mode) return;

    destroySwiper();
    currentMode = mode;

    if (mode === 'desktop') {
      swiper5 = new Swiper('.swiper5', {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        speed: 6000,
        allowTouchMove: false,

        navigation: {
          nextEl: '.swiper-button-next5',
          prevEl: '.swiper-button-prev5',
        },

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },

        freeMode: {
          enabled: true,
          momentum: false,
        },
      });
    } else {
      swiper5 = new Swiper('.swiper5', {
        direction: 'horizontal', // 🔥 ВАЖНО
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        speed: 400,
        allowTouchMove: true,

        navigation: {
          nextEl: '.swiper-button-next5',
          prevEl: '.swiper-button-prev5',
        },
      });
    }
  }

  function destroySwiper() {
    if (!swiper5) return;
    swiper5.destroy(true, true);
    swiper5 = null;
  }

  initSwiper();
  window.addEventListener('resize', initSwiper);

  /* =========================
     YOUTUBE POPUP
  ========================== */

  $(document).on("click", ".youtube-link", function (e) {
    e.preventDefault();

    const videoID = $(this).attr("youtubeid");
    if (!videoID) return;

    destroySwiper();

    $("body").append(`
      <div class="grtvideo-popup">
        <div class="grtvideo-popup-content">
          <span class="grtvideo-popup-close"></span>
          <iframe
            src="https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0"
            allow="autoplay; fullscreen"
            allowfullscreen
            frameborder="0">
          </iframe>
        </div>
      </div>
    `);
  });

  function closeVideo() {
    $(".grtvideo-popup").remove();

    // 🔥 форсированная реинициализация
    setTimeout(() => {
      initSwiper(true);
    }, 50);
  }

  $(document).on("click", ".grtvideo-popup, .grtvideo-popup-close", closeVideo);

  $(document).on("keyup", function (e) {
    if (e.key === "Escape") closeVideo();
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('fix');
    } else {
      nav.classList.remove('fix');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn5 = document.querySelector('.menu-btn');
  const menu5 = document.querySelector('.menu');
  const menuClose = document.querySelector('.menu__close');

  function updateBodyBackground() {
    if (menu5.classList.contains('active')) {
      document.body.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
    }
  }

  // Открытие меню
  menuBtn5.addEventListener('click', () => {
    menuBtn5.classList.toggle('active');
    menu5.classList.toggle('active');
    updateBodyBackground();
  });

  // Закрытие по кнопке
  menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    menu5.classList.remove('active');
    menuBtn5.classList.remove('active');
    updateBodyBackground();
  });

  // Закрытие по фону
  menu5.addEventListener('click', (e) => {
    if (e.target === menu5) {
      menu5.classList.remove('active');
      menuBtn5.classList.remove('active');
      updateBodyBackground();
    }
  });
  // Закрытие при клике по ссылкам меню
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      menuBtn5.classList.remove('active');
      menu5.classList.remove('active');
      updateBodyBackground(); // 🔹 вот эта строка решает проблему
    });
  });

  // Скролл по якорям
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

//========================================================================================================================================================

const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//Селект
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }

  getSelectClass(className) {
    return `.${className}`;
  }

  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }

  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });

    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));

    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));

    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));

    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }

  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);

    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;

    index ? originalSelect.dataset.id = index : null;

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
      }
    }

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);

      const filterEvent = new CustomEvent('filterChange', {
        detail: {
          name: originalSelect.name,
          value: originalSelect.value
        }
      });
      document.dispatchEvent(filterEvent);
    });
  }

  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    selectItem.dataset.id = originalSelect.dataset.id;

    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);

    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

    this.selectDisabled(selectItem, originalSelect);
  }

  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;

    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;

      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }

  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }

  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }

  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);
    this.selectsСlose();

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }

  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }

  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;

    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }

    selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);

    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }

  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }

  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }

  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;

    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;

      if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
        selectOptions = selectOptions.filter(option => option.value);
      }

      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;

      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });

      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }

  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';

    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }

  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }

  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }

  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });

        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (!originalSelect.hasAttribute('data-show-selected')) {
          setTimeout(() => {
            if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
              selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
            }
            optionItem.hidden = true;
          }, this.config.speed);
        }

        const newValue = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
        originalSelect.value = newValue;

        const changeEvent = new Event('change', { bubbles: true });
        originalSelect.dispatchEvent(changeEvent);

        this.selectAction(selectItem);
      }

      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }

  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }

  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }

    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }

    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }

  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }

  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;

    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }

  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}
modules_flsModules.select = new SelectConstructor({});

//Показать еще
function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;

    if (showMoreBlocks.length) {
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
        return !item.dataset.showmoreMedia;
      });
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }

    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }

    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
      let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');

      showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];

      // *** ИЗМЕНЕНИЕ ЗДЕСЬ: принудительно меняем значение data-showmore-content на 5 при ширине ≤ 992px ***
      if (window.innerWidth <= 992 && showMoreContent && showMoreBlock.matches('.main2__showmore')) {
        // Сохраняем оригинальное значение, если нужно, но для расчёта используем 5
        if (!showMoreContent.dataset.originalContent) {
          showMoreContent.dataset.originalContent = showMoreContent.dataset.showmoreContent;
        }
        // Временно подменяем значение для расчёта высоты
        showMoreContent.dataset.showmoreContent = '5';
      } else if (showMoreContent && showMoreContent.dataset.originalContent) {
        // Восстанавливаем оригинальное значение
        showMoreContent.dataset.showmoreContent = showMoreContent.dataset.originalContent;
        delete showMoreContent.dataset.originalContent;
      }
      // *** КОНЕЦ ИЗМЕНЕНИЯ ***

      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, showMoreBlock.classList.contains('_showmore-active') ? getOriginalHeight(showMoreContent) : hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }

    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
      const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;

      if (showMoreType === 'items') {
        // Используем актуальное значение data-showmoreContent (которое мы могли подменить)
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
        const showMoreItems = showMoreContent.children;

        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
          const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;

          hiddenHeight += showMoreItem.offsetHeight + marginTop;
          if (index == showMoreTypeValue) break;
          hiddenHeight += marginBottom;
        }
        rowGap ? hiddenHeight += (showMoreTypeValue - 1) * rowGap : null;
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }

    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');

      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }

      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? parentHidden.hidden = true : null;
      showMoreContent.style.height = `${hiddenHeight}px`;

      return originalHeight;
    }

    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;

      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';

          // *** ЗАПОМИНАЕМ СОСТОЯНИЕ ДО КЛИКА ***
          const wasActive = showMoreBlock.classList.contains('_showmore-active');

          // *** ИЗМЕНЕНИЕ ЗДЕСЬ: также подменяем значение при клике, если нужно ***
          if (window.innerWidth <= 992 && showMoreContent && showMoreBlock.matches('.main2__showmore')) {
            if (!showMoreContent.dataset.originalContent) {
              showMoreContent.dataset.originalContent = showMoreContent.dataset.showmoreContent;
            }
            showMoreContent.dataset.showmoreContent = '5';
          } else if (showMoreContent && showMoreContent.dataset.originalContent) {
            showMoreContent.dataset.showmoreContent = showMoreContent.dataset.originalContent;
            delete showMoreContent.dataset.originalContent;
          }
          // *** КОНЕЦ ИЗМЕНЕНИЯ ***

          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active') ?
              _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) :
              _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle('_showmore-active');
          }

          // *** ИСПРАВЛЕНО: прокрутка к кнопке при скрытии контента ***
          const nowActive = showMoreBlock.classList.contains('_showmore-active');

          // Если был активным, а стал неактивным (скрыли контент)
          if (wasActive && !nowActive) {
            // Даем время на завершение анимации скрытия
            setTimeout(() => {
              // Проверяем видимость кнопки
              const buttonRect = showMoreButton.getBoundingClientRect();
              const isButtonVisible = (
                buttonRect.top >= 0 &&
                buttonRect.bottom <= window.innerHeight
              );

              // Если кнопка не видна, прокручиваем
              if (!isButtonVisible) {
                showMoreButton.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }
            }, parseFloat(showMoreSpeed) + 10); // Ждем окончания анимации + небольшой запас
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
        mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
      }
    }
  });
}
showMore();

const filterTitles = document.querySelectorAll('.main2-filter__titles');

if (filterTitles.length > 0) {
  filterTitles.forEach(title => {
    title.addEventListener('click', function (e) {
      const parentSelect = this.closest('.main2-filter__select');
      
      if (parentSelect) {
        const isActive = parentSelect.classList.contains('active');
        
        document.querySelectorAll('.main2-filter__select.active').forEach(select => {
          select.classList.remove('active');
        });
        
        if (!isActive) {
          parentSelect.classList.add('active');
        }
      }
      
      e.stopPropagation();
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.main2-filter__select')) {
      document.querySelectorAll('.main2-filter__select.active').forEach(select => {
        select.classList.remove('active');
      });
    }
  });
}

//========================================================================================================================================================

