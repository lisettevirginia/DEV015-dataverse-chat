import { sendMessageToOpenAI } from '../lib/openAIApi.js';

// Esta función ahora acepta el personaje como parámetro
const renderChatComponent = (character) => {
  const chatEl = document.createElement('div');
  chatEl.classList.add('chat-container');
  chatEl.innerHTML = `
      <div class="chat-box">
        <div class="chat-header">
          <h3>Chat con ${character.name}</h3>  <!-- Mostrar el nombre del personaje en el encabezado -->
        </div>
        <div class="chat-messages" id="chat-box">
          <!-- Mensajes del chat aparecerán aquí -->
        </div>
        <div class="chat-input">
          <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." />
          <button type="button" id="send-message">Enviar</button>
        </div>
      </div>
    `;

  // Manejar el envío de mensajes
  chatEl.querySelector('#send-message').addEventListener('click', async () => {
    const input = chatEl.querySelector('#chat-input');
    const message = input.value.trim();  // Captura el mensaje del usuario
    if (message) {
      const chatBox = chatEl.querySelector('#chat-box');
      chatBox.innerHTML += `<div><strong>Tú:</strong> ${message}</div>`;

      // Crear el prompt dinámico para el personaje
      const systemPrompt = `Eres ${character.name}, un personaje de la serie "Los Bridgerton". ${character.description}`;
      
      // Enviar el mensaje a OpenAI con el prompt dinámico
      const response = await sendMessageToOpenAI(message, systemPrompt);
      
      // Mostrar la respuesta en el chat
      chatBox.innerHTML += `<div><strong>${character.name}:</strong> ${response}</div>`;
      
      // Limpiar el campo de entrada
      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;  // Desplazar hacia abajo para mostrar el último mensaje
    }
  });

  return chatEl;
};

export default renderChatComponent;
