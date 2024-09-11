import renderHeader from '../components/Renderheader.js';
import renderFooter from '../components/renderFooter.js';
import { getCharacterById } from '../lib/dataFunction.js';
import renderChatComponent from '../components/chatComponent.js';

async function chatIndividual({ id }) {
  const divHome = document.createElement('div');
  divHome.appendChild(renderHeader());

  try {
    const character = await getCharacterById(id);
    if (!character) {
      const errorDiv = document.createElement('div');
      errorDiv.innerText = 'Personaje no encontrado';
      return errorDiv;
    }

    const viewEl = document.createElement('div');
    viewEl.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.imageUrl}" alt="${character.name}" />
      <p>${character.description}</p>
      <button id="chat-button">Chatear</button>
    `;

    divHome.appendChild(viewEl);
    
    // Crear y agregar el componente de chat
    const chatComponent = renderChatComponent();
    divHome.appendChild(chatComponent);

    divHome.appendChild(renderFooter());

    const chatButton = viewEl.querySelector('#chat-button');
    chatButton.addEventListener('click', () => {
      chatComponent.style.display = chatComponent.style.display === 'none' ? 'block' : 'none';
    });

    return divHome;
  } catch (error) {
    const errorDiv = document.createElement('div');
    errorDiv.innerText = 'Hubo un error al cargar el personaje. Inténtalo nuevamente.';
    divHome.appendChild(errorDiv);
    divHome.appendChild(renderFooter());
    return divHome;
  }
}

export default chatIndividual;

