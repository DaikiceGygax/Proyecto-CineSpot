import React, { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating.jsx';
import { formatoDuracion } from '../data.js';

const FALLBACK = '/posters/poster-fallback.svg';

export default function DetalleModal({ elemento, ficha, perfil, onActualizar, onSolicitarLogin, onCerrar }) {
  const esSerie = elemento.tipo === 'Serie';
  const [temporada, setTemporada] = useState(1);
  const [comentario, setComentario] = useState(ficha?.comentario ?? '');
  const [guardado, setGuardado] = useState(false);
  const cerrarRef = useRef(null);
  const textoGuardado = ficha?.comentario ?? '';

  useEffect(() => { setComentario(textoGuardado); setGuardado(false); }, [elemento.id, textoGuardado]);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onCerrar(); };
    document.addEventListener('keydown', onKey);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrarRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = anterior; };
  }, [onCerrar]);
  const total = esSerie ? elemento.temporadas.reduce((s, t) => s + t.episodios, 0) : 0;
  const actual = esSerie ? elemento.temporadas.find(t => t.n === temporada) : null;
  const cambiar = cambios => onActualizar(elemento.id, cambios);

  return <div className="modal-backdrop" onMouseDown={onCerrar}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" onMouseDown={e => e.stopPropagation()}>
      <button ref={cerrarRef} type="button" className="modal-close" onClick={onCerrar} aria-label="Cerrar detalles">✕</button>
      <div className="modal-poster"><img src={elemento.imagen} alt={`Póster de ${elemento.titulo}`} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }} /></div>
      <div className="modal-body">
        <span className="eyebrow">{elemento.tipo.toUpperCase()} · {elemento.genero.toUpperCase()}</span>
        <h2 id="modal-titulo">{elemento.titulo}</h2>
        <div className="modal-facts"><span>{elemento.anio}</span><span className="dot"/><span>{esSerie ? `${elemento.temporadas.length} temporadas · ${total} episodios` : formatoDuracion(elemento.duracion)}</span></div>
        <h3 className="modal-sub">Sinopsis</h3><p className="modal-synopsis">{elemento.sinopsis}</p>
        {!perfil ? <div className="personal-prompt"><p>Inicia sesión para marcar esta historia como vista, agregarla a favoritos, calificarla y escribir tu reseña.</p><button type="button" className="primary-btn" onClick={onSolicitarLogin}>Iniciar sesión / Registrarme</button></div> : <>
          <div className="personal-actions">
            <button type="button" className={ficha?.vista ? 'chip-btn selected' : 'chip-btn'} onClick={() => cambiar({vista: !ficha?.vista})} aria-pressed={Boolean(ficha?.vista)}>{ficha?.vista ? '✓ Ya la vi' : '○ Marcar como vista'}</button>
            <button type="button" className={ficha?.favorita ? 'chip-btn selected' : 'chip-btn'} onClick={() => cambiar({favorita: !ficha?.favorita})} aria-pressed={Boolean(ficha?.favorita)}>{ficha?.favorita ? '♥ En favoritos' : '♡ Agregar a favoritos'}</button>
          </div>
          <h3 className="modal-sub">Tu calificación personal</h3>
          <div className="rating-row"><StarRating valor={ficha?.calificacion ?? 0} onChange={n => cambiar({calificacion: n})}/><span className="rating-text">{ficha?.calificacion ? `${ficha.calificacion} de 5 estrellas` : 'Sin calificar'}</span>{Boolean(ficha?.calificacion) && <button className="link-btn" onClick={() => cambiar({calificacion: 0})}>Quitar</button>}</div>
          <h3 className="modal-sub">Tu comentario</h3>
          <form className="review-form" onSubmit={e => { e.preventDefault(); cambiar({comentario: comentario.trim()}); setGuardado(true); }}>
            <label className="sr-only" htmlFor="review-text">Tu reseña de {elemento.titulo}</label>
            <textarea id="review-text" maxLength={500} rows={4} placeholder="¿Qué te pareció? Escribe tu opinión personal..." value={comentario} onChange={e => { setComentario(e.target.value); setGuardado(false); }}/>
            <div className="review-bottom"><span>{comentario.length}/500 caracteres {guardado && '· ¡Guardado!'}</span><button type="submit" className="primary-btn">Guardar comentario</button></div>
          </form>
        </>}
        {esSerie && <><h3 className="modal-sub">Capítulos</h3><div className="season-tabs" aria-label="Elegir temporada">{elemento.temporadas.map(t => <button key={t.n} type="button" className={t.n === temporada ? 'tab active' : 'tab'} onClick={() => setTemporada(t.n)} aria-pressed={t.n === temporada}>Temporada {t.n}</button>)}</div><ol className="episodes">{Array.from({length: actual.episodios}, (_, i) => <li key={i}><span className="ep-num">{i+1}</span><span>{actual.titulos?.[i] ?? `Capítulo ${i+1}`}</span></li>)}</ol></>}
      </div>
    </div>
  </div>;
}
