import React, { useState } from 'react';
export default function MovieCard({ elemento, favorito, onFavorite, onDetails }) {
  const [fallo, setFallo] = useState(false);
  return <article className="movie-card">
    <button type="button" className="poster-button" onClick={() => onDetails(elemento)} aria-label={`Ver detalles de ${elemento.titulo}`}>
      <img src={fallo ? elemento.respaldo : elemento.imagen} onError={() => setFallo(true)} alt={`Póster de ${elemento.titulo}`} loading="lazy" />
      <span className="image-scrim"/><span className="type-badge">{elemento.tipo}</span><span className="view-poster">Ver detalles ↗</span>
    </button>
    <button type="button" className={`heart ${favorito ? 'is-favorite' : ''}`} onClick={() => onFavorite(elemento.id)} aria-label={favorito ? `Quitar ${elemento.titulo} de favoritos` : `Agregar ${elemento.titulo} a favoritos`} aria-pressed={favorito} title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}>{favorito ? '♥' : '♡'}</button>
    <div className="movie-meta"><button className="movie-name" type="button" onClick={() => onDetails(elemento)}>{elemento.titulo}</button><div className="details"><span>{elemento.genero}</span><span>{elemento.anio}</span></div></div>
  </article>;
}
