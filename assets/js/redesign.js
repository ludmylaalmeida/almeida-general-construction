(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var form = document.querySelector(".estimate-form");

  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
    var mark = window.scrollY + 120;
    var current = links[0];
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section && section.offsetTop <= mark) current = link;
    });
    links.forEach(function (link) {
      link.classList.toggle("active", link === current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (form) form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var body = [
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Phone: " + (data.get("phone") || ""),
      "",
      data.get("message")
    ].join("\n");
    window.location.href =
      "mailto:almeidageneralconstruction@gmail.com?subject=" +
      encodeURIComponent("Free Estimate Request") +
      "&body=" +
      encodeURIComponent(body);
  });
})();
