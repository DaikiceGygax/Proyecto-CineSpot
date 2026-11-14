# CineSpot — Proyecto final T3: Explorador de películas y series

**React 19 + Vite 7 · Aplicación web de programación del lado del cliente.**

CineSpot permite explorar un catálogo de **20 películas y series** con pósters incluidos en el proyecto, buscar por título, filtrar, ordenar, consultar fichas y administrar bibliotecas por perfil local.

## Funciones disponibles

- Catálogo generado desde un arreglo de objetos (`src/data.js`).
- Tarjetas con título, género, año, tipo e imagen local; imagen de respaldo en caso de error.
- Búsqueda por título y filtros combinados por género y tipo.
- Orden **A–Z**, **Z–A**, por año más reciente y más antiguo.
- Ficha de detalle con sinopsis, duración o temporadas y listado de capítulos.
- Registro e inicio de sesión **solo locales** para la demostración escolar.
- Por perfil: favoritos, títulos vistos, títulos por ver, calificación de 1 a 5 y comentarios de hasta 500 caracteres.
- Sección **Mis reseñas** y contadores de biblioteca.
- **Perfil de demostración** accesible con el botón «Entrar al perfil de demostración», sin necesidad de crear una cuenta; trae reseñas y listas de ejemplo que se pueden editar.
- Persistencia local con `localStorage` y sesión de pestaña con `sessionStorage`.
- Interfaz adaptable a dispositivos móviles.

## Requisitos e instalación

Instalar **Node.js** y npm. Abrir la carpeta que contiene `package.json`, NO el archivo HTML directamente.

```bash
npm install
npm run dev
```

Abrir la dirección indicada por Vite, generalmente `http://localhost:5173/`.

Para generar una versión de distribución:

```bash
npm run build
npm run preview
```

En Windows PowerShell, si `npm.ps1` está bloqueado, usar `npm.cmd install`, `npm.cmd run dev` y `npm.cmd run build`. Si Node se maneja con fnm:

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use 26
npm.cmd install
npm.cmd run dev
```

## Arquitectura y componentes

| Archivo | Función |
| --- | --- |
| `src/data.js` | Arreglo local `catalogo` con 20 objetos; año, género, sinopsis y demás campos. |
| `src/App.jsx` | Estados `useState`, búsquedas, filtros, orden `useMemo`, secciones y perfil activo. |
| `src/storage.js` | Perfiles locales; lectura y escritura de arreglos; fichas por película. |
| `src/components/MovieCard.jsx` | Tarjetas del catálogo. |
| `src/components/FilterBar.jsx` | Filtro por tipo y género. |
| `src/components/DetalleModal.jsx` | Sinopsis, capítulos, visto, favorito, estrellas y comentarios. |
| `src/components/AuthModal.jsx` | Registro, inicio de sesión y acceso a la demostración. |
| `src/components/StarRating.jsx` | Selector interactivo de 1 a 5 estrellas. |
| `src/styles.css` | Diseño, estilos responsivos y accesibilidad visual. |

## Cómo demostrarlo en clase

1. Iniciar Vite y mostrar los 20 títulos.
2. Buscar «Coco», filtrar por género y ordenar A–Z/Z–A.
3. Abrir una tarjeta para explicar la sinopsis y el detalle de episodios de una serie.
4. Seleccionar **Entrar / Registrarme → Entrar al perfil de demostración**.
5. Ir a Favoritos, Ya vistas y Mis reseñas; abrir Interstellar para ver sus 5 estrellas y opinión.
6. Modificar la calificación y comentar, guardar, cerrar sesión y volver a entrar al perfil demo para comprobar persistencia.
7. Registrar un usuario nuevo y comprobar que sus listas no contienen datos del demo.
8. Enseñar la adaptación móvil con las herramientas del navegador.

## Seguridad, límites y observaciones

Esta es una **simulación de perfiles para una materia de frontend**, no un sistema de autenticación real: la información se almacena y puede modificarse desde las herramientas del mismo navegador. Las contraseñas de cuentas de prueba se resumen localmente, pero **no se deben usar contraseñas reales**. Los datos NO se comparten entre computadoras ni se almacenan en un servidor. La limpieza de datos del sitio borra cuentas y reseñas.

Los pósters se incluyen como recursos locales con fines de demostración académica. No se consume API y no se requiere backend ni base de datos. Algunos datos de episodios sin títulos detallados aparecen como «Capítulo N».

## Subir al repositorio ya existente

No borres `.git` de la carpeta original conectada con GitHub. Copia **el contenido** de este proyecto sobre ella (no copies `node_modules` ni `dist`). Ejecuta:

```bash
git status
git add .
git commit -m "Entrega final: CineSpot con perfiles, reseñas y demo"
git push origin main
```

Repositorio de entrega: https://github.com/DaikiceGygax/Proyecto-CineSpot

## Material para presentación

Ver `PRESENTACION_CODIGO.md` y `GUION_PRESENTACION.txt`: resumen para diapositivas con fragmentos reales de código y explicaciones.
