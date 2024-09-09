import renderHeader from '../components/Renderheader.js';
import renderFooter from '../components/renderFooter.js';
import { getCharacters } from '../lib/dataFunction.js';

async function chatIndividual() {
  const divHome = document.createElement('div');
  divHome.appendChild(renderHeader());

  // Obtén el id de la URL
  const id = window.location.pathname.split('/')[2]; // El id que viene de la URL, como 'daphne-bridgerton'
  console.log('ID obtenido de la URL:', id);

  try {
    // Esperamos que se resuelva la promesa de getCharacters
    const characters = await getCharacters(); 
    console.log('Personajes obtenidos:', characters);

    // Busca el personaje que coincida con el id de la URL
    const character = characters.find(c => c.id === id);
    console.log('Personaje encontrado:', character);

    if (!character) {
      const errorDiv = document.createElement('div');
      errorDiv.innerText = 'Personaje no encontrado';
      divHome.appendChild(errorDiv);
      divHome.appendChild(renderFooter());
      return divHome;
    }

    // Se crea el contenedor para la vista del personaje
    const viewEl = document.createElement('div');
    viewEl.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.imageUrl}" alt="${character.name}" />
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

    return divHome;
    
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    const errorDiv = document.createElement('div');
    errorDiv.innerText = 'Hubo un error al cargar el personaje. Inténtalo nuevamente.';
    divHome.appendChild(errorDiv);
    divHome.appendChild(renderFooter());
    return divHome;
  }
}

export default chatIndividual;
