import React, { useEffect, useState } from 'react';

export default function AuthModal({ onClose, onSubmit, onDemo }) {
  const [modo, setModo] = useState('entrar');
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [onClose]);

  async function enviar(e) {
    e.preventDefault();
    setCargando(true); setMensaje('');
    try {
      const error = await onSubmit({ modo, nombre: nombre.trim(), clave });
      if (error) setMensaje(error);
    } catch { setMensaje('No se pudo completar la operación.'); }
    finally { setCargando(false); }
  }

  return <div className="modal-backdrop auth-backdrop" onMouseDown={onClose}>
    <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={e => e.stopPropagation()}>
      <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <div className="auth-symbol">✦</div>
      <span className="eyebrow">TU ESPACIO CINÉFILO</span>
      <h2 id="auth-title">{modo === 'entrar' ? 'Bienvenido de nuevo' : 'Crea tu perfil'}</h2>
      <p className="muted">Guarda tus películas vistas, favoritos, reseñas y calificaciones en este navegador.</p>
      <div className="auth-switch" role="group" aria-label="Acceso">
        <button type="button" className={modo === 'entrar' ? 'active' : ''} onClick={() => { setModo('entrar'); setMensaje(''); }}>Iniciar sesión</button>
        <button type="button" className={modo === 'crear' ? 'active' : ''} onClick={() => { setModo('crear'); setMensaje(''); }}>Registrarme</button>
      </div>
      <form onSubmit={enviar} className="auth-form">
        <label>Nombre de usuario<input autoFocus required minLength={3} maxLength={24} autoComplete="username" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Daiki" /></label>
        <label>Contraseña<input required type="password" minLength={6} maxLength={100} autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'} value={clave} onChange={e => setClave(e.target.value)} placeholder="Mínimo 6 caracteres" /></label>
        {mensaje && <p className="auth-error" role="alert">{mensaje}</p>}
        <button className="primary-btn" disabled={cargando} type="submit">{cargando ? 'Procesando…' : modo === 'entrar' ? 'Entrar a mi cuenta' : 'Crear perfil'}</button>
      </form>
      <div className="demo-access"><span>¿Solo quieres probar el proyecto?</span><button type="button" className="outline-btn" onClick={onDemo}>Entrar al perfil de demostración</button></div>
      <p className="privacy-note">Demo escolar: las cuentas solo existen en este navegador. No uses contraseñas reales; no hay recuperación de cuenta ni sincronización entre dispositivos.</p>
    </section>
  </div>;
}
