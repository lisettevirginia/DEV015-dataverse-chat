import { getApiKey, setApiKey } from '../src/lib/apiKey.js';

describe('getApiKey', () => {
  it('debería devolver el valor de la API Key', () => {
    const testApiKey = '123456789abcdef';
    setApiKey(testApiKey);  // Establece la API Key
    const result = getApiKey();  // Obtiene la API Key
    expect(result).toBe(testApiKey);  // Verifica que sea la misma
  });

  it('debería devolver null si no se ha establecido ninguna API Key', () => {
    const result = getApiKey();  // Obtiene la API Key sin haberla establecido
    expect(result).toBeNull();  // Verifica que sea null
  });
});

describe('setApiKey', () => {
  it('debería establecer correctamente la API Key', () => {
    const testApiKey = 'F2GlJB9TnKwqhbbuJWotT3BlbkFJqmoNWgPQIfOMYtUatAVF';
    setApiKey(testApiKey);  // Establece la API Key
    const result = getApiKey();  // Obtiene la API Key
    expect(result).toBe(testApiKey);  // Verifica que sea la misma
  });

  it('debería sobrescribir la API Key anterior', () => {
    const firstApiKey = 'firstKey123';
    const secondApiKey = 'secondKey456';
    setApiKey(firstApiKey);  // Establece la primera API Key
    setApiKey(secondApiKey);  // Sobrescribe con la segunda API Key
    const result = getApiKey();  // Obtiene la API Key
    expect(result).toBe(secondApiKey);  // Verifica que sea la segunda
  });
});
