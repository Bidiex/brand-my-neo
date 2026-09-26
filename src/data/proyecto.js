// Datos fijos del proyecto + helpers. El estado de los spots vive en spots.json.
import data from './spots.json';

export const NEQUI = '3008836295';
export const INSTAGRAM_URL = 'https://www.instagram.com/sileniacamargom_';
export const INSTAGRAM_HANDLE = '@sileniacamargom_';

/*
 * Geometría del grid sobre la imagen /img/neo-lid.png (1369×965), en % de la imagen.
 * Si cambias la foto de la tapa, recalibra estos valores.
 * El logo de Apple ocupa aprox. x 44–56 %, y 38–58 %.
 */
export const LAYOUT = {
  x0: 6,     // borde izquierdo del área de stickers
  x1: 94,    // borde derecho
  gap: 1.4,  // separación horizontal entre spots
  filas: {
    // superior e inferior miden lo mismo (28.5 %); la de arriba no debe verse más chica que la de abajo, que cuesta menos
    superior: { top: 6,    bottom: 34.5 },
    media:    { top: 37,   bottom: 59.5 },
    inferior: { top: 62,   bottom: 90.5 },
  },
  hueco: { left: 40.5, right: 59.5 }, // zona protegida del logo (fila media)
};

const NOMBRES_FILA = { superior: 'Fila superior', media: 'Fila media', inferior: 'Fila inferior' };
const NOMBRES_POS = {
  superior: ['izquierda', 'centro', 'derecha'],
  media: ['extremo izquierdo', 'junto al logo (izq.)', 'junto al logo (der.)', 'extremo derecho'],
  inferior: ['izquierda', 'centro', 'derecha'],
};

function rect(spot) {
  const { x0, x1, gap, filas, hueco } = LAYOUT;
  const { top, bottom } = filas[spot.fila];
  let left, right;
  if (spot.fila === 'media') {
    // 2 spots a cada lado del hueco central
    const lado = spot.posicion < 2 ? [x0, hueco.left] : [hueco.right, x1];
    const i = spot.posicion % 2;
    const w = (lado[1] - lado[0] - gap) / 2;
    left = lado[0] + i * (w + gap);
    right = left + w;
  } else {
    const w = (x1 - x0 - 2 * gap) / 3;
    left = x0 + spot.posicion * (w + gap);
    right = left + w;
  }
  return { left, top, width: right - left, height: bottom - top };
}

export const spots = data.spots.map((s) => ({
  ...s,
  vendido: s.estado === 'vendido',
  nombre: `${NOMBRES_FILA[s.fila]} · ${NOMBRES_POS[s.fila][s.posicion]}`,
  rect: rect(s),
}));

export const meta = data.meta;
export const vendidos = spots.filter((s) => s.vendido);
export const recaudado = data.recaudadoManual ?? vendidos.reduce((t, s) => t + s.precio, 0);
export const porcentaje = Math.min(100, Math.round((recaudado / meta) * 100));

export const cop = (n) => '$' + n.toLocaleString('es-CO');

// Prefija rutas de /public con el base de GitHub Pages; deja pasar URLs absolutas.
export const asset = (p) =>
  !p || /^https?:\/\//.test(p) ? p : import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p.replace(/^\//, '');
