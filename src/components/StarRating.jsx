import React, { useState } from 'react';

export default function StarRating({ valor, onChange }) {
  const [hover, setHover] = useState(0);
  const activo = hover || valor;
  return (
    <div className="stars" role="group" aria-label="Calificación de 1 a 5 estrellas" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= activo ? 'star on' : 'star'}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
          aria-pressed={n <= valor}
        >★</button>
      ))}
    </div>
  );
}
