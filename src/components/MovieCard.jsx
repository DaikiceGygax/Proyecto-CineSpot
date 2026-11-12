import React from 'react';
const FALLBACK = '/posters/poster-fallback.svg';

export default function MovieCard({ elemento, ficha, onSelect, onFavorite, perfil }) {
  return <article className="movie-card">
    <div className="poster-wrap">
      <button type="button" className="poster-button" onClick={() => onSelect(elemento.id)} aria-label={`Ver detalles de ${elemento.titulo}`}>
        <img src={elemento.imagen} alt={`Póster de ${elemento.titulo}`} loading="lazy" onError={e => {e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK;}}/>
      </button>
      <span className="type-badge">{elemento.tipo}</span>
      {ficha?.vista && <span className="seen-badge">✓ Vista</span>}
      {perfil && <button type="button" className={ficha?.favorita ? 'favorite-btn active' : 'favorite-btn'} aria-label={ficha?.favorita ? `Quitar ${elemento.titulo} de favoritos` : `Agregar ${elemento.titulo} a favoritos`} aria-pressed={Boolean(ficha?.favorita)} onClick={() => onFavorite(elemento.id)}> {ficha?.favorita ? '♥' : '♡'} </button>}
      {Boolean(ficha?.calificacion) && <span className="rating-badge">★ {ficha.calificacion}</span>}
    </div>
    <button type="button" className="movie-title-button" onClick={() => onSelect(elemento.id)}><h3 title={elemento.titulo}>{elemento.titulo}</h3></button>
    <div className="details"><span>{elemento.genero}</span><span>{elemento.anio}</span></div>
  </article>;
}
