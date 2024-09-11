import renderHeader from '../components/Renderheader.js';
import renderFooter from '../components/renderFooter.js';
import { setApiKey, getApiKey } from '../lib/apiKey.js'; // Importa las funciones de manejo de API Key

function ApiKey() {
  const divHome = document.createElement('div');  
  divHome.appendChild(renderHeader());

  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h2>Configuración de API Key</h2>
    <p>Ingresa tu clave API para acceder al chat.</p>
    <input type="password" id="api-key-input" placeholder="Tu API Key aquí" />
    <button id="save-api-key">Guardar</button>
    <button id="clear-api-key">Limpiar API Key</button>
    <button id="go-home">Volver al Home</button>
  `;

  divHome.appendChild(viewEl);
  divHome.appendChild(renderFooter());

  // Recupera la API Key almacenada al cargar la página y, si existe, muéstrala en el input
  const apiKeyInput = viewEl.querySelector('#api-key-input');
  const savedApiKey = getApiKey();
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
  }

  // Función para guardar la API Key y cambiar el comportamiento del botón
  const saveApiKey = () => {
    const apiKey = apiKeyInput.value;
    setApiKey(apiKey); // Guarda la API Key en Local Storage
    alert('API Key guardada con éxito.');

    // Cambia el botón para regresar al Home
    saveButton.textContent = 'Regresar al Home';
    saveButton.removeEventListener('click', saveApiKey); // Elimina el listener actual
    saveButton.addEventListener('click', () => {
      window.location.href = '/'; // Redirige al home
    });
  };

  // Función para limpiar la API Key del Local Storage y del input
  const clearApiKey = () => {
    setApiKey(''); // Limpia la API Key del Local Storage
    apiKeyInput.value = ''; // Limpia el input
    alert('API Key eliminada.');
  };

  // Agrega el manejador de eventos para el botón "Guardar"
  const saveButton = viewEl.querySelector('#save-api-key');
  saveButton.addEventListener('click', saveApiKey);

  // Manejador de eventos para el botón "Limpiar API Key"
  const clearButton = viewEl.querySelector('#clear-api-key');
  clearButton.addEventListener('click', clearApiKey);

  // Manejador de eventos para el botón "Volver al Home"
  const goHomeButton = viewEl.querySelector('#go-home');
  goHomeButton.addEventListener('click', () => {
    window.location.href = '/'; // Redirige al home
  });

  return divHome;
}

export default ApiKey;

