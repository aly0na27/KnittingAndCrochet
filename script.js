const btnShowModalWindow = document.querySelectorAll(".btn--show-modal-window");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section1');
const btnOperationsTab = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operation__tab-container");
const operationsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

for (let i = 0; i < btnShowModalWindow.length; i++) {
    btnShowModalWindow[i].addEventListener("click", () => {
        document.querySelector(".modal-window").style.display = "flex";
        document.querySelector(".overlay").classList.remove("hidden");
    });
}

btnCloseModalWindow.addEventListener("click", () => {
    document.querySelector(".modal-window").style.display = "none";
    document.querySelector(".overlay").classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document.querySelector(".modal-window").style.display = "none";
        document.querySelector(".overlay").classList.add("hidden");
    }
});

btnScrollTo.addEventListener("click", function () {
    const section1Coords = section1.getBoundingClientRect();
    console.log(section1Coords);
    // window.scrollTo({
    //     left: section1Coords.left + window.pageXOffset,
    //     top: section1Coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // });
    section1.scrollIntoView({behavior: 'smooth'});
});

document.querySelector(".nav__links").addEventListener('click', function (e) {
    if (e.target.classList.contains("nav__link")) {
        e.preventDefault();
        let href = e.target.getAttribute('href');
        document.querySelector(href).scrollIntoView({behavior: "smooth"});
    }
});

tabContainer.addEventListener("click", function (e) {
    let activeButton = e.target.closest(".operations__tab");
    console.log(activeButton);
    if (!activeButton) {
        console.log(555);
        return;
    }
    btnOperationsTab.forEach(function (tab) {
        tab.classList.remove("operations__tab--active");
    });
    activeButton.classList.add("operations__tab--active");
    operationsContent.forEach(tab => tab.classList.remove("operations__content--active"))
    document.querySelector(`.operations__content--${activeButton.dataset.tab}`).classList.add("operations__content--active");
});

const navLinksAnimation = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const linkOver = e.target;
        const siblingLinks = linkOver.closest(".nav__links").querySelectorAll((".nav__link"));
        const logo = linkOver.closest(".nav").querySelector(".nav__logo");
        const text = linkOver.closest(".nav").querySelector(".nav__text");
        siblingLinks.forEach(el => {
            if (el !== linkOver) {
                el.style.opacity = opacity.toString();

            }
        });
        logo.style.opacity = opacity.toString();
        text.style.opacity = opacity.toString();
    }
}
nav.addEventListener("mouseover", function (e) {
    navLinksAnimation(e, 0.4);
});

nav.addEventListener("mouseout", function (e) {
    navLinksAnimation(e, 1);
});

// const section1Coords = section1.getBoundingClientRect();
// window.addEventListener("scroll", () => {
//     if (window.scrollY > section1Coords.top) {
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
const observer = new IntersectionObserver(getStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
observer.observe(header);

const allSections = document.querySelectorAll(".section");
const appearanceSection = function (entries, observer) {
    const entry = entries[0];
    if (entry.isIntersecting) {
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target)
    }
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
    root: null,
    threshold: 0.2,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

const lazyImages = document.querySelectorAll("img[data-src]");

const loadImages = function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
        return;
    }
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove("lazy-img");
    })
    observer.unobserve(entry.target);
}

const lazyImagesObserver = new IntersectionObserver(loadImages, {
    root: null,
    threshold: 0.7,
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".nav__links");

iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');

})