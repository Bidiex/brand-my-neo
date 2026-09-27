// Idiomas del sitio: español en /, inglés en /en/.
// Cada componente guarda sus textos en un objeto { es: {...}, en: {...} } y elige con getLang(Astro).
export const getLang = (Astro) => (Astro.currentLocale === 'en' ? 'en' : 'es');

// Ruta de la home en cada idioma (sin el base de GitHub Pages; pásala por asset()).
export const homePath = (lang) => (lang === 'en' ? '/en/' : '/');
