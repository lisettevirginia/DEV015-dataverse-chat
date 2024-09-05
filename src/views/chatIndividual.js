/*import renderHeader from '../components/Renderheader.js';
import renderFooter from '../components/renderFooter.js';
import { getCharacters } from '../lib/dataFunction.js'; */

function chatIndividual() {
  const divHome = document.createElement('div')
  return divHome
  /* const divHome = document.createElement('div');
  divHome.appendChild(renderHeader());

  // Obtén el id de la url
  const id = window.location.pathname.split('/')[2];

  // Utiliza getCharacters para obtener el personaje por ID
  const character = getCharacters(id);

  if (!character) {
    // Manejo del caso en que el personaje no se encuentre
    const errorDiv = document.createElement('div');
    errorDiv.innerText = 'Personaje no encontrado';
    return errorDiv;
  }

  // Se crea el contenedor para la vista del personaje
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <p>${character.description}</p>
    <button id="chat-button">Chatear</button>
  `;

  divHome.appendChild(viewEl);
  divHome.appendChild(renderFooter());

  // Agrega el manejador de eventos para el botón "Chatear"
  const chatButton = viewEl.querySelector('#chat-button');
  chatButton.addEventListener('click', () => {
    alert(`Iniciando chat con ${character.name}`);
  });

  return divHome; */
}

export default chatIndividual;
