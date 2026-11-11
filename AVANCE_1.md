# Avance 1 del proyecto: CineSpot

## Objetivo
Iniciar el desarrollo de una aplicación web para explorar un catálogo de películas y series mediante React, haciendo uso de componentes, estado y renderizado dinámico.

## Trabajo realizado
Se seleccionó React con Vite y se construyó la interfaz principal. Se creó un arreglo local con 20 obras y un componente reutilizable que representa cada obra mediante una tarjeta con imagen ilustrativa, título, año, tipo y género. Se agregó un campo para buscar títulos y filtros combinables por tipo y por género. La interfaz cuenta con un diseño oscuro adaptable a diferentes tamaños de pantalla y muestra un estado vacío cuando no hay coincidencias.

## Aplicación de React
`App.jsx` administra el estado de los filtros con `useState`; los resultados se calculan a partir del catálogo y se renderizan con `map`. Los componentes `FilterBar` y `MovieCard` reciben información por `props`, y los botones/campos utilizan eventos `onClick` y `onChange`.

## Pendiente
Para la segunda parte se implementará la selección de tarjetas para consultar sinopsis, año y duración o temporadas; también se habilitará agregar, quitar y consultar contenido favorito.

## Evidencias que se pueden capturar
Captura de la pantalla inicial, captura de búsqueda por título, captura filtrando series, captura combinando género y tipo, y captura del mensaje sin resultados. Se recomienda adjuntarlas después de ejecutar el proyecto.
