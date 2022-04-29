const navMobileEl = document.querySelector(".nav__mobile");
const navListEl = document.querySelector(".nav__list");
const navMobileCloseEl = document.querySelector(".nav__mobile__close");
const navMobileMenuEl = document.querySelector(".nav__mobile__menu");

navMobileEl.addEventListener("click", function (e) {
  const btn = e.target;

  if (btn.closest(".nav__mobile__menu")) {
    btn.style.display = "none";
    navMobileCloseEl.style.display = "block";
    navListEl.style.opacity = 1;
    navListEl.style.visibility = "visible";
    navListEl.style.pointerEvents = "event";
  }

  if (btn.closest(".nav__mobile__close")) {
    btn.style.display = "none";
    navMobileMenuEl.style.display = "block";
    navListEl.style.opacity = 0;
    navListEl.style.visibility = "hidden";
    navListEl.style.pointerEvents = "none";
  }
});
