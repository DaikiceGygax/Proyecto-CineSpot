import React, { useMemo, useState } from 'react';
import { catalogo } from './data.js';
import MovieCard from './components/MovieCard.jsx';
import FilterBar from './components/FilterBar.jsx';

const generos = [...new Set(catalogo.map((elemento) => elemento.genero))].sort((a, b) => a.localeCompare(b, 'es'));

export default function App() {
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [genero, setGenero] = useState('Todos');

  const resultados = useMemo(() => catalogo.filter((item) => {
    const texto = busqueda.trim().toLocaleLowerCase('es');
    return item.titulo.toLocaleLowerCase('es').includes(texto)
      && (tipo === 'Todos' || item.tipo === tipo)
      && (genero === 'Todos' || item.genero === genero);
  }), [busqueda, tipo, genero]);

  const limpiarFiltros = () => { setBusqueda(''); setTipo('Todos'); setGenero('Todos'); };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="CineSpot, ir al inicio"><span className="brand-icon">✦</span> Cine<span>Spot</span></a>
        <span className="header-tag">Proyecto escolar · Avance 1</span>
      </header>
      <main id="inicio" className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span>
            <h1 id="hero-title">Encuentra algo <em>increíble</em> para ver.</h1>
            <p>Explora películas y series, busca por título y descubre historias por género. Todo en un mismo lugar.</p>
            <div className="hero-stats"><span><strong>{catalogo.length}</strong> títulos</span><span className="dot"/><span><strong>{generos.length}</strong> géneros</span></div>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="hero-glow"/><div className="art-frame"><span>✧</span><span className="art-label">CINESPOT ORIGINAL COLLECTION</span></div></div>
        </section>
        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading"><div><div className="eyebrow">EXPLORA NUESTRO CATÁLOGO</div><h2 id="catalog-title">Películas y series</h2></div><p>{resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}</p></div>
          <label className="search-box"><span aria-hidden="true" className="search-symbol">⌕</span><span className="sr-only">Buscar por título</span><input type="search" placeholder="Buscar películas o series..." value={busqueda} onChange={e => setBusqueda(e.target.value)} /></label>
          <FilterBar tipo={tipo} setTipo={setTipo} genero={genero} setGenero={setGenero} generos={generos} />
          {resultados.length ? <div className="movie-grid">{resultados.map(item => <MovieCard key={item.id} elemento={item} />)}</div> : <div className="empty-state"><div className="empty-icon">⌕</div><h3>No encontramos resultados</h3><p>Prueba con otro título o cambia los filtros.</p><button type="button" onClick={limpiarFiltros}>Restablecer filtros</button></div>}
        </section>
        <aside className="upcoming"><span>PRÓXIMAMENTE</span><p> PRÓXIMAMENTE</p></aside>
      </main>
      <footer className="footer">CineSpot · Proyecto T3 · Programación del lado del cliente <span>Hecho con React</span></footer>
    </div>
  );
}
