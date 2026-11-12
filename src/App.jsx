import React, { useCallback, useMemo, useState } from 'react';
import { catalogo } from './data.js';
import MovieCard from './components/MovieCard.jsx';
import FilterBar from './components/FilterBar.jsx';
import DetalleModal from './components/DetalleModal.jsx';
import AuthModal from './components/AuthModal.jsx';
import { cargarPerfiles, guardarPerfiles, sesionActual, guardarSesion, obtenerFicha, actualizarFicha, hashClave, crearSalt } from './storage.js';

const generos = [...new Set(catalogo.map(p => p.genero))].sort((a,b) => a.localeCompare(b,'es'));
const colacion = new Intl.Collator('es', { sensitivity: 'base', numeric: true });
const opcionesOrden = [{valor:'az',texto:'Título: A → Z'},{valor:'za',texto:'Título: Z → A'},{valor:'recientes',texto:'Año: más recientes'},{valor:'antiguas',texto:'Año: más antiguas'}];

export default function App() {
  const [perfiles, setPerfiles] = useState(cargarPerfiles);
  const [usuarioId, setUsuarioId] = useState(sesionActual);
  const [authAbierto, setAuthAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [genero, setGenero] = useState('Todos');
  const [orden, setOrden] = useState('az');
  const [seccion, setSeccion] = useState('todos');
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const perfil = perfiles.find(p => p.id === usuarioId) ?? null;
  const fichaDe = id => obtenerFicha(perfil, id);

  const actualizarPerfiles = (siguientes) => {
    if (!guardarPerfiles(siguientes)) return false;
    setPerfiles(siguientes);
    return true;
  };
  const actualizar = (peliculaId, cambios) => {
    if (!perfil) { setAuthAbierto(true); return; }
    const siguientes = perfiles.map(p => p.id !== perfil.id ? p : {...p, lista: actualizarFicha(p.lista, peliculaId, cambios)});
    if (!actualizarPerfiles(siguientes)) window.alert('No se pudieron guardar los cambios en este navegador. Revisa el almacenamiento disponible.');
  };
  const cambiarFavorito = id => actualizar(id, {favorita: !fichaDe(id)?.favorita});
  const cerrarDetalle = useCallback(() => setSeleccionadoId(null), []);

  const autenticar = async ({modo, nombre, clave}) => {
    if (nombre.length < 3 || nombre.length > 24) return 'El nombre debe tener entre 3 y 24 caracteres.';
    if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    const normalizado = nombre.toLocaleLowerCase('es').trim();
    const existente = perfiles.find(p => p.nombre.toLocaleLowerCase('es') === normalizado);
    if (modo === 'crear') {
      if (existente) return 'Ya existe un perfil con ese nombre. Inicia sesión o elige otro.';
      const salt = crearSalt();
      const claveHash = await hashClave(clave, salt);
      const nuevo = {id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${salt}`, nombre, salt, claveHash, lista: []};
      if (!actualizarPerfiles([...perfiles, nuevo])) return 'No se pudo guardar el perfil. Comprueba que el almacenamiento esté disponible.';
      guardarSesion(nuevo.id); setUsuarioId(nuevo.id); setAuthAbierto(false); return null;
    }
    if (!existente || existente.claveHash !== await hashClave(clave, existente.salt)) return 'Usuario o contraseña incorrectos.';
    guardarSesion(existente.id); setUsuarioId(existente.id); setAuthAbierto(false); return null;
  };
  const cerrarSesion = () => { guardarSesion(null); setUsuarioId(null); setSeccion('todos'); setSeleccionadoId(null); };
  const elegirSeccion = nueva => { if (nueva !== 'todos' && !perfil) {setAuthAbierto(true); return;} setSeccion(nueva); };

  const resultados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es');
    return catalogo.filter(p => p.titulo.toLocaleLowerCase('es').includes(texto) && (tipo === 'Todos' || p.tipo === tipo) && (genero === 'Todos' || p.genero === genero) && (
      seccion === 'todos' || (perfil && (seccion === 'favoritos' ? obtenerFicha(perfil,p.id)?.favorita : seccion === 'vistas' ? obtenerFicha(perfil,p.id)?.vista : !obtenerFicha(perfil,p.id)?.vista))
    )).sort((a,b) => {
      if (orden === 'az') return colacion.compare(a.titulo,b.titulo);
      if (orden === 'za') return colacion.compare(b.titulo,a.titulo);
      if (orden === 'recientes') return b.anio - a.anio || colacion.compare(a.titulo,b.titulo);
      return a.anio - b.anio || colacion.compare(a.titulo,b.titulo);
    });
  }, [busqueda,tipo,genero,orden,seccion,perfil]);
  const limpiar = () => {setBusqueda('');setTipo('Todos');setGenero('Todos');setSeccion('todos');setOrden('az');};
  const totalVistas = perfil?.lista.filter(f => f.vista).length ?? 0;
  const totalFavoritos = perfil?.lista.filter(f => f.favorita).length ?? 0;
  const totalComentarios = perfil?.lista.filter(f => f.comentario).length ?? 0;
  const seleccionado = catalogo.find(p => p.id === seleccionadoId);

  return <div className="app-shell">
    <header className="site-header">
      <a className="brand" href="#inicio"><span className="brand-icon">✦</span> Cine<span>Spot</span></a>
      <div className="header-actions">
        <span className="header-tag">Proyecto escolar · Avance 3</span>
        {perfil ? <><span className="welcome-name">Hola, <strong>{perfil.nombre}</strong></span><button type="button" className="outline-btn" onClick={cerrarSesion}>Salir</button></> : <button className="primary-btn header-login" onClick={() => setAuthAbierto(true)}>Entrar / Registrarme</button>}
      </div>
    </header>
    <main id="inicio" className="container">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><span className="eyebrow">TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span><h1 id="hero-title">Encuentra algo <em>increíble</em> para ver.</h1><p>Explora el catálogo, guarda las que ya viste, califica tus favoritas y lleva tu diario de cine personal.</p><div className="hero-stats"><span><strong>{catalogo.length}</strong> títulos</span><span className="dot"/><span><strong>{generos.length}</strong> géneros</span>{perfil && <><span className="dot"/><span><strong>{totalVistas}</strong> vistos</span></>}</div></div><div className="hero-art" aria-hidden="true"><div className="hero-glow"/><div className="art-frame"><span>✧</span><span className="art-label">CINESPOT COLLECTION</span></div></div></section>
      {perfil && <section className="dashboard" aria-label="Resumen de tu perfil"><div><span className="eyebrow">TU BIBLIOTECA PERSONAL</span><h2>El rincón de {perfil.nombre}</h2><p>Tu progreso queda guardado en este navegador.</p></div><div className="dashboard-stats"><div><strong>{totalVistas}</strong><span>Vistas</span></div><div><strong>{totalFavoritos}</strong><span>Favoritas</span></div><div><strong>{totalComentarios}</strong><span>Reseñas</span></div></div></section>}
      <section className="catalog-section" aria-labelledby="catalog-title">
        <div className="section-heading"><div><span className="eyebrow">EXPLORA NUESTRO CATÁLOGO</span><h2 id="catalog-title">Películas y series</h2></div><p>{resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}</p></div>
        <nav className="library-tabs" aria-label="Tu biblioteca">{[['todos','Explorar'],['favoritos',`♡ Favoritos ${perfil ? `(${totalFavoritos})` : ''}`],['vistas',`✓ Ya vistas ${perfil ? `(${totalVistas})` : ''}`],['pendientes','Por ver']].map(([key,text]) => <button type="button" key={key} onClick={() => elegirSeccion(key)} className={seccion === key ? 'active' : ''} aria-current={seccion === key ? 'page' : undefined}>{text}</button>)}</nav>
        <label className="search-box"><span className="search-symbol" aria-hidden="true">⌕</span><span className="sr-only">Buscar por título</span><input type="search" placeholder="Buscar películas o series..." value={busqueda} onChange={e => setBusqueda(e.target.value)}/></label>
        <div className="toolbar"><FilterBar tipo={tipo} setTipo={setTipo} genero={genero} setGenero={setGenero} generos={generos}/><label className="sort-label">Ordenar por <select value={orden} onChange={e => setOrden(e.target.value)}>{opcionesOrden.map(o => <option key={o.valor} value={o.valor}>{o.texto}</option>)}</select></label></div>
        {resultados.length ? <div className="movie-grid">{resultados.map(p => <MovieCard key={p.id} elemento={p} ficha={fichaDe(p.id)} perfil={perfil} onSelect={setSeleccionadoId} onFavorite={cambiarFavorito}/>)}</div> : <div className="empty-state"><div className="empty-icon">⌕</div><h3>No encontramos resultados</h3><p>Prueba con otros filtros o agrega títulos a tu lista.</p><button onClick={limpiar}>Mostrar todo el catálogo</button></div>}
      </section>
    </main>
    <footer className="footer">CineSpot · Proyecto T3 · Programación del lado del cliente <span>React · Arrays · localStorage</span></footer>
    {seleccionado && <DetalleModal key={seleccionado.id} elemento={seleccionado} ficha={fichaDe(seleccionado.id)} perfil={perfil} onActualizar={actualizar} onSolicitarLogin={() => {setSeleccionadoId(null);setAuthAbierto(true);}} onCerrar={cerrarDetalle}/>} 
    {authAbierto && <AuthModal onClose={() => setAuthAbierto(false)} onSubmit={autenticar}/>}
  </div>;
}
