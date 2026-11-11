# CineSpot — Avance 1

Proyecto T3: **Explorador de películas y series** (Programación del lado del cliente).

## Tecnología

- React: biblioteca de interfaz, componentes y estado con `useState`.
- Vite: entorno de desarrollo y compilación.
- CSS: diseño adaptable a celular, tableta y computadora.
- Los 20 títulos están en un arreglo de objetos (`src/data.js`). **No hay backend, base de datos ni API**.
- Los pósteres son **ilustraciones originales de muestra**, no pósteres oficiales.

## Instalación y ejecución

1. Instala Node.js (versión moderna, compatible con Vite 7; Node 20.19+ o 22.12+).
2. Abre esta carpeta en Visual Studio Code.
3. Abre una terminal en la carpeta del proyecto.
4. Ejecuta:

```bash
npm install
npm run dev
```

5. Abre en el navegador la dirección que muestre la terminal (normalmente `http://localhost:5173`).

Para generar una versión de distribución: `npm run build`.

> **Importante:** no abras `index.html` directamente con doble clic; debes iniciar Vite desde la terminal.

## Componentes

- `App.jsx`: estructura, estado de la búsqueda, tipo y género; combinaciones de filtros con `useMemo`.
- `components/FilterBar.jsx`: botones para elegir películas/series y selector de género. Recibe valores y eventos del componente principal por props.
- `components/MovieCard.jsx`: muestra imagen ilustrativa, título, género, año y tipo de cada obra.
- `data.js`: catálogo local de 20 objetos.

## Estado real del avance

**Implementado:** 20 películas/series, tarjetas con imagen y metadatos, búsqueda por título, filtros por tipo y género, mensaje si no hay resultados, diseño responsive.

**Pendiente para el segundo avance:** al seleccionar una tarjeta, abrir información detallada (sinopsis, año, duración o temporadas); marcar y desmarcar favoritos y mostrar una sección de favoritos.

## Pruebas sugeridas

1. Buscar `coco`: debe salir Coco.
2. Seleccionar `Series`: mostrar únicamente series.
3. Elegir género `Misterio`: mostrar obras de misterio.
4. Combinar `Series` + `Misterio` + búsqueda `dark`: debe mostrar Dark.
5. Buscar un título inexistente: mostrar un aviso y botón para restablecer filtros.
6. Reducir el ancho de la ventana para comprobar que la cuadrícula se adapta.
