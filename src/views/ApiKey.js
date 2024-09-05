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
    <input type="text" id="api-key-input" placeholder="Tu API Key aquí" />
    <button id="save-api-key">Guardar</button>
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

    // Cambia la función del botón para que redirija al home
    saveButton.textContent = 'Regresar al Home';
    saveButton.removeEventListener('click', saveApiKey); // Elimina este listener
    saveButton.addEventListener('click', () => {
      window.location.href = '/'; // Cambia a la ruta del home (ajústala si es necesario)
    });
  };

  // Agrega el manejador de eventos para el botón "Guardar"
  const saveButton = viewEl.querySelector('#save-api-key');
  saveButton.addEventListener('click', saveApiKey);

  return divHome;
}

export default ApiKey;
