import renderHeader from '../components/Renderheader.js';
import renderFooter from '../components/renderFooter.js';
import { getCharacters } from '../lib/dataFunction.js'; 

function Character({ id }) {
  const character = getCharacters(id); // Obtiene el personaje por ID

  const divCharacter = document.createElement('div');
  divCharacter.appendChild(renderHeader());

  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h2>${character.name}</h2>
    <p>${character.description}</p>
    <button id="chat-button">Chatear</button>
  `;

  divCharacter.appendChild(viewEl);
  divCharacter.appendChild(renderFooter());

  // Agrega el manejador de eventos para el botón "Chatear"
  const chatButton = viewEl.querySelector('#chat-button');
  chatButton.addEventListener('click', () => {
    // Lógica para iniciar el chat con el personaje
    alert(`Iniciando chat con ${character.name}`);
  });

  return divCharacter;
}

export default Character;
