import { getApiKey}  from '../lib/apiKey.js'
export async function sendMessageToOpenAI(question, systemPrompt) {
  const apiKey = getApiKey();  // Obtener la API Key
  
  if (!apiKey) {
    throw new Error('API Key no disponible.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },  // Prompt dinámico del personaje
          { role: 'user', content: question }  // Mensaje del usuario
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud a OpenAI.');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error al enviar mensaje a OpenAI:', error);
    return 'No se pudo obtener una respuesta. Inténtalo de nuevo más tarde.';
  }
}
