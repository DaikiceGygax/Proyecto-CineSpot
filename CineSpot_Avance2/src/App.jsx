import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { catalogo } from './data.js';
import MovieCard from './components/MovieCard.jsx';
import FilterBar from './components/FilterBar.jsx';
import DetailsModal from './components/DetailsModal.jsx';

const generos = [...new Set(catalogo.map(item => item.genero))].sort((a,b)=>a.localeCompare(b,'es'));
function leerFavoritos(){try{const d=JSON.parse(localStorage.getItem('cinespot-favoritos-v2')||'[]');return Array.isArray(d)?d.filter(x=>Number.isInteger(x)):[]}catch{return []}}
export default function App() {
 const [busqueda,setBusqueda] = useState('');
 const [tipo,setTipo] = useState('Todos');
 const [genero,setGenero] = useState('Todos');
 const [vista,setVista] = useState('catalogo');
 const [orden,setOrden] = useState('original');
 const [favoritos,setFavoritos] = useState(leerFavoritos);
 const [seleccion,setSeleccion] = useState(null);
 useEffect(()=>{try{localStorage.setItem('cinespot-favoritos-v2',JSON.stringify(favoritos))}catch{}},[favoritos]);
 const cambiarFavorito = useCallback(id=>setFavoritos(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]),[]);
 const cerrar = useCallback(()=>setSeleccion(null),[]);
 const resultados = useMemo(()=>{
  const texto=busqueda.trim().toLocaleLowerCase('es');
  const lista=catalogo.filter(x=>(!texto || x.titulo.toLocaleLowerCase('es').includes(texto)) && (tipo==='Todos'||x.tipo===tipo) && (genero==='Todos'||x.genero===genero) && (vista!=='favoritos'||favoritos.includes(x.id)));
  if(orden==='anio-desc')return [...lista].sort((a,b)=>b.anio-a.anio);
  if(orden==='anio-asc')return [...lista].sort((a,b)=>a.anio-b.anio);
  if(orden==='titulo')return [...lista].sort((a,b)=>a.titulo.localeCompare(b.titulo,'es'));
  return lista;
 },[busqueda,tipo,genero,vista,favoritos,orden]);
 const limpiar=()=>{setBusqueda('');setTipo('Todos');setGenero('Todos');setOrden('original')};
 const destacadas=catalogo.filter(item=>item.destacado);
 return <div className="app-shell"><header className="site-header"><div className="header-inner"><button type="button" className="brand" onClick={()=>{setVista('catalogo');limpiar()}} aria-label="Ir al inicio"><span className="brand-icon">✦</span> Cine<span>Spot</span></button><nav className="top-nav" aria-label="Navegación principal"><button className={vista==='catalogo'?'nav-active':''} onClick={()=>setVista('catalogo')}>Explorar</button><button className={vista==='favoritos'?'nav-active':''} onClick={()=>setVista('favoritos')}>♡ Mis favoritos <span className="nav-count">{favoritos.length}</span></button></nav><span className="header-tag">PROYECTO T3 · AVANCE 2</span></div></header>
 <main className="container"><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot"/> TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span><h1>Un universo de historias<span> a un clic.</span></h1><p>Encuentra tu próxima película o serie favorita. Descubre nuevos mundos, explora géneros y crea tu propia colección.</p><div className="hero-actions"><button className="primary-btn" onClick={()=>{setVista('catalogo');document.getElementById('catalog-title')?.scrollIntoView({behavior:'smooth'})}}>Explorar catálogo <span>↗</span></button><button className="secondary-btn" onClick={()=>setVista('favoritos')}>♡ Ver mis favoritos</button></div><div className="hero-stats"><div><strong>{catalogo.length}</strong><small>TÍTULOS</small></div><div><strong>{generos.length}</strong><small>GÉNEROS</small></div><div><strong>{favoritos.length}</strong><small>FAVORITOS</small></div></div></div><div className="hero-visual" aria-hidden="true"><div className="glow"/>{destacadas.slice(0,3).map((item,i)=><img key={item.id} className={`hero-poster hero-poster-${i}`} src={item.imagen} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=item.respaldo}} alt=""/>)}<span className="hero-visual-caption">DESCUBRE · GUARDA · DISFRUTA</span></div></section>
 <section className="catalog-section" aria-labelledby="catalog-title"><div className="section-top"><div><span className="eyebrow">TU ESPACIO CINÉFILO</span><h2 id="catalog-title">{vista==='favoritos'?'Tu colección de favoritos':'Explora el catálogo'}<span className="title-spark">✳</span></h2><p>{vista==='favoritos'?'Las historias que guardaste para volver a ellas.':'Películas inolvidables y series para maratonear.'}</p></div><span className="results-tag">{resultados.length} {resultados.length===1?'resultado':'resultados'}</span></div><div className="toolbar"><label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Buscar por título</span><input type="search" value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar una película o serie..." /></label><label className="sort-label">Ordenar <select value={orden} onChange={e=>setOrden(e.target.value)}><option value="original">Destacados</option><option value="titulo">Título A–Z</option><option value="anio-desc">Más recientes</option><option value="anio-asc">Más antiguos</option></select></label></div><FilterBar tipo={tipo} setTipo={setTipo} genero={genero} setGenero={setGenero} generos={generos}/>
 {resultados.length ? <div className="movie-grid">{resultados.map(item=><MovieCard key={item.id} elemento={item} favorito={favoritos.includes(item.id)} onFavorite={cambiarFavorito} onDetails={setSeleccion}/>)}</div>:<div className="empty-state"><span>✧</span><h3>{vista==='favoritos' && !favoritos.length?'Aún no tienes favoritos':'No encontramos resultados'}</h3><p>{vista==='favoritos' && !favoritos.length?'Explora el catálogo y toca el corazón de alguna película o serie.':'Prueba con otro título o cambia los filtros.'}</p><button className="primary-btn" onClick={()=>{limpiar();if(vista==='favoritos'&&!favoritos.length)setVista('catalogo')}}>{vista==='favoritos'&&!favoritos.length?'Explorar catálogo':'Limpiar filtros'}</button></div>}</section>
 <section className="note-section"><span>✦</span><div><h3>Tu cine, a tu manera.</h3><p>Los favoritos se guardan en este navegador mediante localStorage. No es necesario iniciar sesión.</p></div></section></main>
 <footer className="footer"><div className="footer-inner"><span>✦ CineSpot</span><span>Proyecto T3 · Programación del lado del cliente</span><span>React + Vite</span></div></footer>
 <DetailsModal pelicula={seleccion} favorito={seleccion ? favoritos.includes(seleccion.id) : false} onFavorite={cambiarFavorito} onClose={cerrar}/></div>;
}
