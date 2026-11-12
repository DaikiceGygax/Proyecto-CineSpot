# CineSpot — Avance 2 🎬

Explorador de películas y series para el **Proyecto T3: Programación del lado del cliente**. Aplicación hecha con React + Vite, sin backend, base de datos ni API de contenido.

## Instalación en Windows (PowerShell)

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use 26
npm.cmd install
npm.cmd run dev
```

Abre la dirección que indique Vite (normalmente `http://localhost:5173/`). Si `npm` no está bloqueado en tu PowerShell, puedes usar `npm` en vez de `npm.cmd`.

> Abre la aplicación con el servidor Vite, **no** haciendo doble clic en `index.html`.

## Funcionalidades

- Catálogo local de **20** películas y series (`src/data.js`).
- Pósters desde URLs HTTPS de TMDB con imágenes ilustrativas locales de respaldo si falla la carga.
- Búsqueda en tiempo real por título.
- Filtros por tipo y género; combinación de filtros.
- Ordenación por título y año.
- Ventana de detalles con sinopsis, año, tipo, género y duración/temporadas.
- Añadir y quitar favoritos desde la tarjeta o desde los detalles.
- Vista **Mis favoritos**.
- Persistencia de favoritos usando `localStorage` del navegador.
- Diseño adaptable a computadora y celular.

## Componentes

- `App.jsx`: estado global de la interfaz, búsqueda, filtros, favoritos, orden, navegación y detalles.
- `FilterBar.jsx`: controles de tipo y género.
- `MovieCard.jsx`: tarjetas con póster, información y botón de favorito.
- `DetailsModal.jsx`: ficha ampliada con sinopsis y datos.
- `data.js`: catálogo local de objetos.

## Verificación

1. Abrir la página y comprobar que existen 20 títulos.
2. Buscar `Coco`, seleccionar Películas y comprobar el filtro.
3. Pulsar el corazón de `Coco`, ir a **Mis favoritos** y comprobar que aparece.
4. Actualizar Chrome y comprobar que conserva el favorito.
5. Hacer clic sobre una tarjeta para ver sinopsis y duración/temporadas.
6. Probar en vista móvil con las herramientas de Chrome.
7. Ejecutar `npm.cmd run build` para compilar antes de entregar.

## Información sobre imágenes

Los pósters son solicitados directamente a `image.tmdb.org` al visualizar la página. **Requieren internet**. Si una URL deja de funcionar, se muestra automáticamente una ilustración local. CineSpot no solicita credenciales ni API keys. Las imágenes pertenecen a sus titulares; uso demostrativo/educativo. Los metadatos son una selección local y no se actualizan automáticamente.

## Subir Avance 2 al repositorio existente

Copia el contenido de esta carpeta **encima de tu carpeta local del Avance 1** (la que ya conectaste a GitHub), conservando su carpeta oculta `.git`. Después, desde esa carpeta:

```powershell
git status
git add .
git commit -m "Avance 2: posters, detalles y favoritos"
git push origin main
```

No subas `node_modules`, `dist`, ni claves o contraseñas.
