import React from 'react';
export default function MovieCard({ elemento }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img src={elemento.imagen} alt={`Póster ilustrativo de ${elemento.titulo}`} loading="lazy" />
        <span className="type-badge">{elemento.tipo}</span>
      </div>
      <div className="movie-meta">
        <h3 title={elemento.titulo}>{elemento.titulo}</h3>
        <div className="details"><span>{elemento.genero}</span><span>{elemento.anio}</span></div>
      </div>
    </article>
  );
}
