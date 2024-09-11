import { sendMessageToOpenAI } from '../lib/openAIApi.js';

const renderChatComponent = () => {
  const chatEl = document.createElement('div');
  chatEl.classList.add('chat-container'); // Aplicar la clase al contenedor del chat
  chatEl.innerHTML = `
      <div class="chat-box">
        <div class="chat-header">
          <h3>Chat con el personaje</h3>
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
    
  chatEl.querySelector('#send-message').addEventListener('click', async () => {
    const input = chatEl.querySelector('#chat-input');
    const message = input.value.trim();
    if (message) {
      // Agregar el mensaje del usuario al chat
      const chatBox = chatEl.querySelector('#chat-box');
      chatBox.innerHTML += `<div><strong>Tú:</strong> ${message}</div>`;
        
      // Enviar el mensaje a OpenAI y obtener la respuesta
      const response = await sendMessageToOpenAI([{ role: 'user', content: message }]);
        
      // Agregar la respuesta al chat
      chatBox.innerHTML += `<div><strong>Personaje:</strong> ${response}</div>`;
        
      // Limpiar el campo de entrada después de enviar el mensaje
      input.value = '';
        
      // Desplazar el chat hacia abajo para mostrar el último mensaje
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
    
  return chatEl;
};
  
export default renderChatComponent;
  