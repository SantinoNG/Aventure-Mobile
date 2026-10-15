(function () {
  var c = window.SITE_CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };

  if (c.telefono) {
    var t = $("link-tel");
    t.href = "tel:+54" + c.telefono;
    t.textContent = "📞 " + c.telefono.slice(0, 4) + " " + c.telefono.slice(4);
  }
  if (c.whatsapp) {
    $("link-wa").href = "https://wa.me/" + c.whatsapp;
  }
  if (c.instagram) {
    var user = c.instagram.replace("@", "").trim();
    var ig = $("link-ig");
    ig.href = "https://instagram.com/" + user;
    ig.textContent = "📷 @" + user;
    ig.target = "_blank";
    ig.rel = "noopener";
    ig.hidden = false;
  }
  $("anio").textContent = new Date().getFullYear();
})();
