// current year in footer
const currentYear = new Date().getFullYear();
const yearEl = document.querySelector('.year');
yearEl.textContent = currentYear;

///////////////////////////////////////////
// Making mobile menu work
const headerEl = document.querySelector('.header');
const mobileMenuBtnOpenEl = document.querySelector('.btn-mobile-nav');
mobileMenuBtnOpenEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});
////////////////////////////////////////////////
// smooth scrolling with js (это может быть уже и не нужно потому что safari наконец то поддерживает scroll-behavior: smooth в css)
document.querySelectorAll('a:link').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    console.log(href);

    // Scroll to top
    if (href === '#') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    // Scroll to element with id
    if (href !== '#' && href !== '' && href.startsWith('#')) {
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu
    if (link.classList.contains('main-nav-link')) {
      headerEl.classList.remove('nav-open');
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation
const navEl = document.querySelector('.header');
const sectionHeroEl = document.querySelector('.section-hero');

const observer = new IntersectionObserver(
  function (entires) {
    const entry = entires[0];
    console.log(entry);
    if (entry.isIntersecting === false) {
      // добавляем высоту header, потому что мы его вынимаем из html, и получается скачок, что бы этого не было просто добавляем высоту header в margintop для section-hero
      sectionHeroEl.style.marginTop = navEl.offsetHeight + 'px';
      // добавляем класс для прилипания навигации
      navEl.classList.add('sticky');
    }
    if (entry.isIntersecting === true) {
      sectionHeroEl.style.marginTop = 0;
      navEl.classList.remove('sticky');}
  },
  {
    // in the viewport
    root: null,
    // 0% of hero section in the viewport
    threshold: 0,
    // мы хотим что бы наша навигация появлялась за 80пикселей до того как hero section полностью спрячется (80 px - высота навигации)
    rootMargin: '-80px',
  },
);
observer.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
