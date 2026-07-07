(function() {
  // === Tab switching ===
  var tabBtns = document.querySelectorAll(".tab-btn[data-tab]");
  var tabPanels = document.querySelectorAll(".tab-panel[data-tab]");

  function switchTab(name) {
    tabBtns.forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === name);
    });
    tabPanels.forEach(function(panel) {
      panel.classList.toggle("active", panel.getAttribute("data-tab") === name);
    });
  }

  tabBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var name = btn.getAttribute("data-tab");
      switchTab(name);
      history.replaceState(null, "", "#" + name);
      window.scrollTo({ top: document.querySelector(".tab-bar").offsetTop, behavior: "smooth" });
    });
  });

  // Handle hero CTA link to #download
  document.querySelector(".hero .cta").addEventListener("click", function(e) {
    e.preventDefault();
    switchTab("download");
    history.replaceState(null, "", "#download");
    window.scrollTo({ top: document.querySelector(".tab-bar").offsetTop, behavior: "smooth" });
  });

  // Activate tab from URL hash on load
  var hash = location.hash.replace("#", "");
  var validTabs = ["features", "how-it-works", "security", "download"];
  if (validTabs.indexOf(hash) !== -1) {
    switchTab(hash);
  }

  // === Carousel ===
  var carousel = document.getElementById("carousel");
  var img = carousel.querySelector(".carousel-img");
  var title = carousel.querySelector(".carousel-title");
  var desc = carousel.querySelector(".carousel-desc");
  var counter = carousel.querySelector(".carousel-counter");
  var slides = [];
  var current = 0;

  document.querySelectorAll("[data-carousel-title]").forEach(function(el) {
    slides.push({
      src: el.src,
      alt: el.alt,
      title: el.getAttribute("data-carousel-title"),
      desc: el.getAttribute("data-carousel-desc") || ""
    });
    el.style.cursor = "zoom-in";
    el.addEventListener("click", function() {
      open(slides.indexOf(
        slides.find(function(s) { return s.src === el.src; })
      ));
    });
  });

  function show(i) {
    current = (i + slides.length) % slides.length;
    var s = slides[current];
    img.src = s.src;
    img.alt = s.alt;
    title.textContent = s.title;
    desc.innerHTML = s.desc;
    desc.style.display = s.desc ? "" : "none";
    counter.textContent = (current + 1) + " / " + slides.length;
  }

  function open(i) {
    show(i);
    carousel.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    carousel.hidden = true;
    document.body.style.overflow = "";
  }

  carousel.querySelector(".carousel-backdrop").addEventListener("click", close);
  carousel.querySelector(".carousel-close").addEventListener("click", close);
  carousel.querySelector(".carousel-prev").addEventListener("click", function() { show(current - 1); });
  carousel.querySelector(".carousel-next").addEventListener("click", function() { show(current + 1); });

  document.addEventListener("keydown", function(e) {
    if (carousel.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
