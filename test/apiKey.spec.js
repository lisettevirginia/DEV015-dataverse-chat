import { getApiKey, setApiKey } from '../src/lib/apiKey.js';

describe('getApiKey', () => {
  beforeEach(() => {
    // Limpiar el Local Storage antes de cada test
    localStorage.clear();
  });

  it('debería devolver el valor de la API Key', () => {
    setApiKey('123456789abcdef');  // Establecer una API Key de prueba
    const result = getApiKey();
    expect(result).toBe('123456789abcdef');
  });

  it('debería devolver null si no se ha establecido ninguna API Key', () => {
    const result = getApiKey();  // No se ha establecido una API Key
    expect(result).toBeNull();  // Verifica que sea null
  });
});

describe('setApiKey', () => {
  beforeEach(() => {
    // Limpiar el Local Storage antes de cada test
    localStorage.clear();
  });

  it('debería establecer correctamente la API Key', () => {
    setApiKey('123456789abcdef');
    const result = getApiKey();
    expect(result).toBe('123456789abcdef');
  });

  it('debería sobrescribir la API Key anterior', () => {
    setApiKey('initialKey');
    setApiKey('newKey');
    const result = getApiKey();
    expect(result).toBe('newKey');
  });
});
