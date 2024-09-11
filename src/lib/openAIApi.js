// openAIApi.js
export async function sendMessageToOpenAI(question) {
  // Obtener la API KEY desde Local Storage
  const apiKey = getApiKey(); 
  
  // Verificar si se obtuvo la API KEY
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
        messages: [{ role: 'user', content: question }]
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
  
// Función para obtener la API KEY desde Local Storage
const getApiKey = () => localStorage.getItem('apiKey');
  
  