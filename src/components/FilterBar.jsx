import React from 'react';
export default function FilterBar({ tipo, setTipo, genero, setGenero, generos }) {
  return (
    <div className="filter-layout">
      <div className="tabs" aria-label="Filtrar por tipo">
        {['Todos', 'Película', 'Serie'].map((opcion) => (
          <button key={opcion} type="button" className={tipo === opcion ? 'tab active' : 'tab'} onClick={() => setTipo(opcion)} aria-pressed={tipo === opcion}>
            {opcion === 'Película' ? 'Películas' : opcion === 'Serie' ? 'Series' : opcion}
          </button>
        ))}
      </div>
      <label className="genre-label">Género
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="Todos">Todos los géneros</option>
          {generos.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );
}
