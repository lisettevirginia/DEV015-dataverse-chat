// Función para cambiar la ruta
export function navigateTo(url) {
  // Cambia la URL sin recargar la página
  window.history.pushState(null, null, url);
    
  // Dispara el evento de cambio de URL manualmente
  window.dispatchEvent(new PopStateEvent('popstate'));
}
  