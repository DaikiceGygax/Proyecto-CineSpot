# Avance 3 de CineSpot

Se conservó el diseño y el catálogo de 20 títulos del Avance 2. Se agregaron ordenamiento alfabético ascendente y descendente (más año), registro e inicio de sesión local, listas independientes para cada usuario, estado "Ya vista", favoritos, reseñas personales, calificación de una a cinco estrellas y filtros de biblioteca.

**Implementación con arreglos:** `catalogo` es un arreglo de objetos; `perfiles` es un arreglo de cuentas locales; cada perfil tiene un arreglo `lista` de fichas de películas. Se utilizan `find`, `filter`, `map`, `sort` y `reduce` para consultar, ordenar y actualizar información.

**Aclaración:** el login es una demostración de funcionamiento en el navegador, no autenticación segura en un servidor. Se utiliza `localStorage` y `sessionStorage` sin backend ni base de datos, en concordancia con el proyecto de clase.

**Antes de entregar:** hacer pruebas en Chrome con `npm install` / `npm run dev`, documentar capturas y subir los archivos al repositorio de GitHub del equipo.
