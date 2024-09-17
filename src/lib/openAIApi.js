import { getApiKey}  from '../lib/apiKey.js' //importación de la función
export async function sendMessageToOpenAI(question, systemPrompt) { //definición de la función
  const apiKey = getApiKey();  // Obtener la API Key
  
  if (!apiKey) { 
    throw new Error('API Key no disponible.'); //Verificación
  }

  try { //se intenta realizar la solicitus del API de openai
    const response = await fetch('https://api.openai.com/v1/chat/completions', { // realiza peticiones a HTTP
      method: 'POST', //se coloca post porq se estan enviando datos
      headers: {
        'Authorization': `Bearer ${apiKey}`, //para autenticar la solicitud
        'Content-Type': 'application/json' //dice q esta en formato json
      },
      body: JSON.stringify({ //cuerpo de la solicitud
        model: 'gpt-3.5-turbo', //modelo de openai
        messages: [
          { role: 'system', content: systemPrompt },  // Prompt dinámico del personaje
          { role: 'user', content: question }  // Mensaje del usuario
        ]
      })
    });

    if (!response.ok) { //verifica que la respuesta de la api sea exitosa
      throw new Error('Error en la solicitud a OpenAI.');
    }

    const data = await response.json(); //conversión de la respuesta a json
    return data.choices[0].message.content.trim(); //devuelve el texto de la primera opción generada por el modelo de OpenAI
  } catch (error) {  // manejo de errores
    return 'No se pudo obtener una respuesta. Inténtalo de nuevo más tarde.';
  }
}
