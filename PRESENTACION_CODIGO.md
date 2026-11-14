# CineSpot — Código listo para colocar en la presentación

**Proyecto:** Explorador de películas y series. **Tecnología:** React, Vite, JavaScript, CSS. **Tema:** Programación del lado del cliente y manejo de frameworks.

---

## Diapositiva 1 — Objetivo y tecnologías
**Texto para la diapositiva:** CineSpot es una aplicación web que facilita descubrir películas y series. Utiliza React para crear componentes reutilizables, estados para interactividad y arreglos de objetos para almacenar el catálogo y las listas de cada perfil.

**Explicación oral:** No usamos backend ni una API. Los datos del catálogo están en nuestro código y las preferencias de los usuarios se guardan localmente en el navegador.

## Diapositiva 2 — Catálogo mediante arreglos (`src/data.js`)
```js
export const catalogo = [
  { id: 1, titulo: 'Interstellar', tipo: 'Película',
    genero: 'Ciencia ficción', anio: 2014,
    imagen: '/posters/interestellar.png', duracion: 169,
    sinopsis: 'Con la Tierra al borde del colapso...' },
  // El arreglo contiene 20 películas y series.
];
```
**Explicación:** Cada elemento es un objeto con propiedades que se muestran dinámicamente. Las series incluyen un arreglo de temporadas.

## Diapositiva 3 — Componentes (`src/App.jsx`)
```jsx
<div className="movie-grid">
  {resultados.map(p => (
    <MovieCard
      key={p.id}
      elemento={p}
      ficha={fichaDe(p.id)}
      perfil={perfil}
      onSelect={setSeleccionadoId}
      onFavorite={cambiarFavorito}
    />
  ))}
</div>
```
**Explicación:** `map` recorre el arreglo de resultados y genera una tarjeta por título. Los datos y eventos se transmiten mediante `props`.

## Diapositiva 4 — Estado con React (`src/App.jsx`)
```jsx
const [busqueda, setBusqueda] = useState('');
const [tipo, setTipo] = useState('Todos');
const [genero, setGenero] = useState('Todos');
const [orden, setOrden] = useState('az');
const [seccion, setSeccion] = useState('todos');
```
**Explicación:** Cuando cambia alguno de estos estados, React vuelve a renderizar la interfaz con los filtros elegidos.

## Diapositiva 5 — Búsqueda y ordenamiento (`src/App.jsx`)
```js
const texto = busqueda.trim().toLocaleLowerCase('es');
const filtrados = catalogo.filter(p =>
  p.titulo.toLocaleLowerCase('es').includes(texto) &&
  (tipo === 'Todos' || p.tipo === tipo) &&
  (genero === 'Todos' || p.genero === genero)
);
const ordenados = [...filtrados].sort((a, b) =>
  colacion.compare(a.titulo, b.titulo)
);
```
**Explicación:** `filter` selecciona coincidencias y `sort` permite el orden alfabético. En la aplicación final también se incluye Z–A y orden por año; el resultado real se calcula con `useMemo`.

## Diapositiva 6 — Perfiles con arreglos (`src/storage.js`)
```js
export function obtenerFicha(perfil, peliculaId) {
  return perfil?.lista?.find(item =>
    item.peliculaId === peliculaId
  ) ?? null;
}
```
**Explicación:** Cada perfil tiene su propio arreglo `lista`. La función `find` recupera la película del usuario activo, sin mezclar las preferencias de otros perfiles.

## Diapositiva 7 — Actualizar listas (`src/storage.js`)
```js
export function actualizarFicha(lista, peliculaId, cambios) {
  const anterior = lista.find(item => item.peliculaId === peliculaId) ?? {
    peliculaId, vista: false, favorita: false,
    calificacion: 0, comentario: ''
  };
  const ficha = { ...anterior, ...cambios };
  const resultado = lista.filter(item => item.peliculaId !== peliculaId);
  if (ficha.vista || ficha.favorita || ficha.calificacion || ficha.comentario)
    resultado.push(ficha);
  return resultado;
}
```
**Explicación:** Recuperamos la ficha anterior, aplicamos las modificaciones, eliminamos la versión vieja y devolvemos un nuevo arreglo, que React utiliza para actualizar la vista.

## Diapositiva 8 — Guardar datos en el navegador (`src/storage.js`)
```js
export function guardarPerfiles(perfiles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(perfiles));
    return true;
  } catch {
    return false;
  }
}
```
**Explicación:** `JSON.stringify` convierte el arreglo de perfiles a texto JSON y `localStorage` lo conserva en el navegador después de recargar.

## Diapositiva 9 — Calificaciones y comentarios (`src/components/DetalleModal.jsx`)
```jsx
<StarRating
  valor={ficha?.calificacion ?? 0}
  onChange={n => cambiar({ calificacion: n })}
/>
<textarea
  id="review-text"
  maxLength={500}
  value={comentario}
  onChange={e => setComentario(e.target.value)}
/>
```
**Explicación:** El usuario selecciona de una a cinco estrellas y escribe una opinión de hasta 500 caracteres. Al guardar, se actualiza su ficha.

## Diapositiva 10 — Resultado y límites
**Resultado:** catálogo de 20 títulos; búsqueda, filtros y orden; ventana con información; favoritos; vistos; por ver; reseñas; perfiles de prueba; diseño adaptable.

**Límite importante:** el inicio de sesión es una simulación local; no es autenticación segura, no utiliza servidor y no sincroniza perfiles entre computadoras.

**Demostración recomendada:** buscar Coco → abrir detalle → entrar con el perfil demo → mostrar favoritas, vistas y reseñas → cambiar una calificación → cerrar y volver a entrar.

---

**Nota para la compañera:** los ejemplos muestran partes del código real (algunos fragmentos se abreviaron para la diapositiva). El código completo está en `src/`. Dejar 5–6 líneas por diapositiva cuando sea posible y poner la explicación en notas del expositor.
