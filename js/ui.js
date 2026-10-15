// Interfaz con Alpine.js: menú hamburguesa (celular) y modo claro/oscuro.
document.addEventListener("alpine:init", function () {
  Alpine.data("header", function () {
    return {
      open: false,
      dark: false,
      init: function () {
        var saved = null;
        try { saved = localStorage.getItem("tema"); } catch (e) {}
        var sistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.dark = saved ? saved === "dark" : sistema;
        this.apply();
      },
      apply: function () {
        document.documentElement.setAttribute("data-theme", this.dark ? "dark" : "light");
      },
      toggleTheme: function () {
        this.dark = !this.dark;
        this.apply();
        try { localStorage.setItem("tema", this.dark ? "dark" : "light"); } catch (e) {}
      }
    };
  });
});
