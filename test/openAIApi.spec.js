import { sendMessageToOpenAI } from '../src/lib/openAIApi.js';  // Importa la función que queremos probar
import { getApiKey } from '../src/lib/apiKey.js'; // Importa la función para obtener la API Key

// Mockear la función getApiKey para controlar el valor que devuelve durante la prueba
jest.mock('../src/lib/apiKey.js', () => ({
  getApiKey: jest.fn()
}));

describe('sendMessageToOpenAI', () => {
  test('debe retornar la respuesta esperada de OpenAI', async () => {
    // Simular una API Key válida
    getApiKey.mockReturnValue('api-key-fake');

    // Simular una respuesta exitosa de la API de OpenAI
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Respuesta de prueba' } }]
        })
      })
    );

    // Llamar a la función con parámetros de prueba
    const response = await sendMessageToOpenAI('¿Cómo estás?', 'Eres un asistente amigable.');

    // Verificar que la respuesta sea la esperada
    expect(response).toBe('Respuesta de prueba');
  });

  test('debe lanzar un error si la API Key no está disponible', async () => {
    // Simular que no hay API Key
    getApiKey.mockReturnValue(null);

    // Esperar que la función lance un error
    await expect(sendMessageToOpenAI('¿Cómo estás?', 'Eres un asistente amigable.')).rejects.toThrow('API Key no disponible.');
  });

  test('debe retornar un mensaje de error si la solicitud falla', async () => {
    // Simular una API Key válida
    getApiKey.mockReturnValue('api-key-fake');

    // Simular una respuesta fallida de la API
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    // Llamar a la función y verificar el mensaje de error
    const response = await sendMessageToOpenAI('¿Cómo estás?', 'Eres un asistente amigable.');
    expect(response).toBe('No se pudo obtener una respuesta. Inténtalo de nuevo más tarde.');
  });
});



