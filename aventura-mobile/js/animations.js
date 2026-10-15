// Animaciones: GSAP + ScrollTrigger, Swiper, Lottie y Chart.js.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // ---- Carrusel de modelos (Swiper) ----
  if (window.Swiper && $(".models")) {
    new Swiper(".models", {
      slidesPerView: 1, spaceBetween: 20, grabCursor: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: { 760: { slidesPerView: 2 }, 1020: { slidesPerView: 3 } }
    });
  }

  // ---- Sol animado (Lottie) ----
  if (window.lottie && window.SOL_ANIMATION && $("#lottie-sol")) {
    lottie.loadAnimation({
      container: $("#lottie-sol"), renderer: "svg", loop: true,
      autoplay: !reduce, animationData: window.SOL_ANIMATION
    });
  }

  // ---- Gráfico de costos (Chart.js) ----
  var cv = $("#chart-costos");
  if (window.Chart && cv) {
    var datos = [
      ["Vehículo base (chasis)", 40, "#2f6fb0"], ["Carrocería y estructura", 14, "#1d4a7a"],
      ["Interior y mobiliario", 12, "#f59e0b"], ["Sistema de energía solar", 8, "#ffc766"],
      ["Equipamiento y confort", 8, "#4aa3df"], ["Mano de obra", 7, "#2e9e8f"],
      ["Agua y gas", 5, "#e0662a"], ["Instalación eléctrica", 4, "#7a8ca5"],
      ["Imprevistos y otros", 3, "#a9b6c8"]
    ];
    var ul = $("#legend");
    datos.forEach(function (d) {
      var li = document.createElement("li");
      li.innerHTML = '<i style="background:' + d[2] + '"></i>' + d[0] + "<b>" + d[1] + "%</b>";
      ul.appendChild(li);
    });
    var crear = function () {
      new Chart(cv, {
        type: "doughnut",
        data: { labels: datos.map(function (d) { return d[0]; }),
                datasets: [{ data: datos.map(function (d) { return d[1]; }),
                             backgroundColor: datos.map(function (d) { return d[2]; }),
                             borderWidth: 0, spacing: 2 }] },
        options: { cutout: "58%", animation: reduce ? false : { duration: 1200 },
                   plugins: { legend: { display: false },
                              tooltip: { callbacks: { label: function (c) { return " " + c.label + ": " + c.parsed + "%"; } } } } }
      });
    };
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({ trigger: cv, start: "top 90%", once: true, onEnter: crear });
    } else { crear(); }
  }

  // ---- GSAP + ScrollTrigger ----
  if (!window.gsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);

  // Barra de progreso de lectura
  gsap.to("#progress", { scaleX: 1, ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  // Entrada del hero + parallax de la imagen
  gsap.from(".hero .tag, .hero h1, .hero p, .hero .btns",
    { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.1 });
  gsap.from(".hero img", { x: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  gsap.to(".hero img", { y: -40, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // Bloques que entran desde los costados (data-anim="left" | "right" | "up")
  $$("[data-anim]").forEach(function (el) {
    var t = el.getAttribute("data-anim");
    gsap.from(el, { x: t === "left" ? -90 : t === "right" ? 90 : 0, y: t === "up" ? 40 : 0,
      opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true } });
  });

  // Títulos y textos introductorios (los que no están dentro de un bloque animado)
  $$("section h2, section .lead").forEach(function (el) {
    if (el.closest("[data-anim]")) return;
    gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });

  // Tarjetas que aparecen una tras otra
  var tarjetas = $$("#beneficios .card, .person, .stats .grid4 > div");
  gsap.set(tarjetas, { opacity: 0, y: 40 });
  ScrollTrigger.batch(tarjetas, { start: "top 90%", once: true,
    onEnter: function (b) { gsap.to(b, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7,
      ease: "power2.out", clearProps: "transform,opacity" }); } });

  // Contadores
  $$("[data-count]").forEach(function (el) {
    var fin = parseFloat(el.getAttribute("data-count")), pre = el.getAttribute("data-prefix") || "";
    var o = { v: 0 };
    el.textContent = pre + "0";
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: function () {
      gsap.to(o, { v: fin, duration: 1.6, ease: "power2.out", onUpdate: function () {
        el.textContent = pre + Math.round(o.v).toLocaleString("es-AR"); } });
    } });
  });

  // Sección fija (pin): las frases se revelan mientras se hace scroll
  var q = $(".quote");
  if (q) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: q, start: "top top",
      end: "+=70%", pin: true, scrub: true, anticipatePin: 1 } });
    var h = q.querySelectorAll("h2");
    tl.from(h[1], { x: 120, opacity: 0, duration: 1 })
      .from(q.querySelector("p"), { y: 30, opacity: 0, duration: 1 });
  }

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
