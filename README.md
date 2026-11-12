# CineSpot — Avance 3: mi diario de películas y series

Aplicación de **Programación Web / Tema 3** creada con **React + Vite**, sin backend ni API. Mejora del proyecto CineSpot Avance 2.

## Funciones

- Catálogo de 20 películas y series desde un **arreglo de objetos** en `src/data.js`.
- Pósters locales incluidos en `public/posters` (algunos pueden ser ilustrativos).
- Búsqueda de título y filtros de tipo y género.
- **Orden alfabético A–Z / Z–A**, y por año ascendente/descendente.
- Ventana de detalle: sinopsis, duración o temporadas y capítulos.
- **Registro e inicio de sesión locales**: perfiles guardados en un arreglo en `localStorage`.
- Cada perfil tiene su **propio arreglo** de películas vistas, favoritos, calificaciones (1 a 5) y comentarios (máximo 500 caracteres).
- Pestañas **Explorar, Favoritos, Ya vistas, Por ver** y estadísticas personales.
- Las notas y comentarios persisten al recargar el navegador y después de salir/iniciar sesión en el mismo navegador.
- Interfaz adaptable a celular y computadora.

## Instalar

En la carpeta que contiene `package.json`:

```bash
npm install
npm run dev
```

En Windows/PowerShell, si npm.ps1 está bloqueado, utiliza `npm.cmd install` y `npm.cmd run dev`.
Entra en la URL que muestre Vite, normalmente `http://localhost:5173/`. No abras `index.html` por doble clic.
Para comprobar el proyecto: `npm run build`.

## Componentes y arreglos

- `src/data.js`: `catalogo` (20 objetos).
- `src/storage.js`: utilidades para guardar, consultar y actualizar el **arreglo de perfiles** y el **arreglo `lista`** de cada perfil.
- `App.jsx`: estado con `useState`, filtros y ordenamientos con `useMemo`, navegación y perfiles.
- `AuthModal.jsx`: formularios de registro/inicio de sesión.
- `MovieCard.jsx`: tarjetas, estado de vista y favoritos.
- `DetalleModal.jsx`: sinopsis, visto, favorito, calificación y comentario.
- `StarRating.jsx` y `FilterBar.jsx`: estrellas y filtros reutilizables.

Ejemplo conceptual del arreglo de perfiles:

```js
[
  { id: 'abc', nombre: 'usuario1', salt: '...', claveHash: '...', lista: [
    { peliculaId: 1, vista: true, favorita: true, calificacion: 5, comentario: 'Me encantó' }
  ] }
]
```

## Importante: seguridad y límites de los perfiles

**Esta autenticación es únicamente una simulación local para una práctica escolar.** Los perfiles se almacenan en `localStorage`, separados por usuario pero **no protegidos frente a quien tenga acceso al navegador**. La contraseña se almacena como un resumen SHA-256 con sal, no en texto plano, pero eso **no convierte este prototipo en un sistema de autenticación seguro**: cualquiera con acceso a las herramientas del navegador puede alterar los datos. No uses contraseñas reales. No existe sincronización entre dispositivos, recuperación de cuenta ni base de datos. Borrar datos del sitio elimina perfiles y reseñas. Para usuarios reales sería necesario un backend con autenticación y almacenamiento seguros.

Las calificaciones del avance anterior se guardaban globalmente y no se asignan automáticamente a ninguna cuenta nueva para evitar mezclar usuarios.

## Pruebas recomendadas

1. Sin registrarte, prueba la búsqueda y el orden A–Z/Z–A.
2. Crea el perfil `demo1` con una contraseña de prueba de 6+ caracteres.
3. Abre Coco; márcala como vista, favorita, califícala y deja un comentario.
4. Cambia a las secciones Favoritos y Ya vistas; comprueba que Coco aparece.
5. Cierra sesión y crea otro perfil: no debe ver las listas de `demo1`.
6. Vuelve a `demo1`: sus cambios deben permanecer.
7. Prueba filtros combinados, el orden por año, episodios y la vista móvil.

## GitHub (proyecto existente)

Copia los archivos de este avance sobre tu carpeta local conectada a GitHub, **sin borrar `.git`** y sin copiar `node_modules` ni `dist`. Después:

```bash
git add .
git commit -m "Avance 3: perfiles locales, vistas, comentarios y orden alfabetico"
git push origin main
```
