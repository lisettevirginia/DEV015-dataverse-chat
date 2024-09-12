import { getApiKey}  from '../lib/apiKey.js'
export async function sendMessageToOpenAI(question) {
  // Obtener la API KEY desde Local Storage
  const apiKey = getApiKey();
  
  // Verificar si se obtuvo la API KEY
  if (!apiKey) {
    throw new Error('API Key no disponible.');
  }

  // Asegurarnos de que `question` sea una cadena de texto
  if (typeof question !== 'string') {
    console.error('El parámetro question no es una cadena de texto:', question);
    throw new Error('La pregunta enviada debe ser una cadena de texto.');
  }

  // Crear un mensaje inicial con el prompt del personaje
  const characterPrompt = `Eres Daphne Bridgerton, un personaje de la serie "Los Bridgerton". Eres encantadora, decidida y vienes de una familia respetada. Responde las preguntas como si fueras Daphne.`;

  // El cuerpo de la solicitud
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: characterPrompt },  // Mensaje inicial con el contexto del personaje
      { role: 'user', content: question }  // Asegurarnos de que sea una cadena de texto simple
    ]
  };

  console.log("Request Body:", JSON.stringify(requestBody, null, 2));  // Verifica el cuerpo de la solicitud

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)  // Enviar el cuerpo de la solicitud
    });

    if (!response.ok) {
      const errorData = await response.json();  // Leer el error devuelto por OpenAI
      console.error('Error de OpenAI:', errorData);
      throw new Error('Error en la solicitud a OpenAI.');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error al enviar mensaje a OpenAI:', error);
    return 'No se pudo obtener una respuesta. Inténtalo de nuevo más tarde.';
  }
}
