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

    // Contenedor que tendrá la imagen y el chat
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('contenedor-imagen-chat'); // Clase para estilos CSS


    
    // Crear la vista del personaje con imagen y detalles
    const viewEl = document.createElement('div');
    viewEl.classList.add('viewEl-content'); // Nueva clase para aplicar estilos específicos si es necesario
    viewEl.innerHTML = `
      <h2>${character.name}</h2>
      <img class="personajeImagen" src="${character.imageUrl}" alt="${character.name}" />
      <p>${character.description}</p>
    `;

    // Botón para abrir/cerrar el chat
    const chatButton = document.createElement('button');
    chatButton.id = 'chat-button';
    chatButton.innerText = 'Chatear';

    // Crear el botón para regresar a Home
    const botonHome = document.createElement('button');
    botonHome.id = 'botonHome';
    botonHome.innerText = 'Regresar a Home';

    // Agregar el evento de click al botón para regresar a Home
    botonHome.addEventListener('click', () => {
      window.location.href = '/'; // Asegúrate de ajustar la ruta a tu home si es diferente
    });

    // Crear el componente del chat y agregarlo al contenedor
    const chatComponent = renderChatComponent(character);
    chatComponent.style.display = 'none'; // Ocultar el chat inicialmente

    // Contenedor del botón y el chat
    const chatContainerDiv = document.createElement('div');
    chatContainerDiv.classList.add('chat-container-wrapper'); // Nuevo contenedor para el botón y el chat

    // Agregar el botón y el chat al contenedor del chat
    chatContainerDiv.appendChild(chatButton);
    chatContainerDiv.appendChild(chatComponent);

    // Agregar la vista del personaje, el contenedor del chat y el botón Home al contenedor principal
    containerDiv.appendChild(viewEl); 
    containerDiv.appendChild(chatContainerDiv);

    containerDiv.appendChild(botonHome); // Aquí agregamos el botón Home dentro del contenedor

    // Agregar todo al divHome
    divHome.appendChild(containerDiv);
    divHome.appendChild(renderFooter());

    // Agregar el evento de click para mostrar/ocultar el chat
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
