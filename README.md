# Aventura Mobile

Landing page estática (HTML + Tailwind CSS + JavaScript simple). No necesita servidor.

## Estructura

- `index.html`: todo el contenido, dividido por secciones comentadas.
- `css/styles.css`: estilos de Tailwind ya compilados (es el que usa la página).
- `js/config.js`: teléfono, WhatsApp e Instagram (editá acá).
- `js/ui.js`: menú móvil, animaciones al scroll, contadores y links de contacto.
- `js/simulador.js`: simulador de autonomía solar.
- `js/cotizacion.js`: formulario de cotización por pasos (abre WhatsApp).
- `img/`: imágenes usadas por la página.
- `src/input.css` y `tailwind.config.js`: solo hacen falta si querés recompilar Tailwind.

## Publicar

Subí todo a GitHub. En Netlify dejá vacíos el comando de build y el directorio a publicar.

## Si agregás clases nuevas de Tailwind

```bash
npm install
npm run build
```
