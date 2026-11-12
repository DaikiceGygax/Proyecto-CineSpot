// CineSpot: cuentas locales de demostración (sin servidor).
// Array de perfiles: [{ id, nombre, salt, claveHash, lista: [{ peliculaId, vista, favorita, calificacion, comentario }] }]
export const STORAGE_KEY = 'cinespot-perfiles-v3';
export const SESSION_KEY = 'cinespot-sesion-v3';

export function cargarPerfiles() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(data)) return [];
    return data.filter(p => p && typeof p.id === 'string' && typeof p.nombre === 'string' && Array.isArray(p.lista));
  } catch { return []; }
}

export function guardarPerfiles(perfiles) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(perfiles)); return true; }
  catch { return false; }
}

export function sesionActual() {
  try { return sessionStorage.getItem(SESSION_KEY); } catch { return null; }
}

export function guardarSesion(id) {
  try { if (id) sessionStorage.setItem(SESSION_KEY, id); else sessionStorage.removeItem(SESSION_KEY); }
  catch { /* navegación privada */ }
}

export function obtenerFicha(perfil, peliculaId) {
  return perfil?.lista?.find(item => item.peliculaId === peliculaId) ?? null;
}

export function actualizarFicha(lista, peliculaId, cambios) {
  const anterior = lista.find(item => item.peliculaId === peliculaId) ?? {
    peliculaId, vista: false, favorita: false, calificacion: 0, comentario: ''
  };
  const ficha = { ...anterior, ...cambios };
  const resultado = lista.filter(item => item.peliculaId !== peliculaId);
  if (ficha.vista || ficha.favorita || ficha.calificacion || ficha.comentario) resultado.push(ficha);
  return resultado;
}

// Hash con sal para evitar guardar contraseñas en texto plano.
// Sigue siendo un prototipo LOCAL: no ofrece autenticación real ni protección ante manipulación del navegador.
export async function hashClave(clave, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${clave}`);
  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
    return 'sha256:' + Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
  }
  // Fallback de demostración para abrir Vite por IP LAN (origen HTTP inseguro).
  // No es un algoritmo seguro para contraseñas reales.
  let h = 2166136261;
  for (const b of bytes) { h ^= b; h = Math.imul(h, 16777619); }
  return 'demo:' + (h >>> 0).toString(16).padStart(8, '0');
}

export function crearSalt() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), n => n.toString(16).padStart(2, '0')).join('');
}
