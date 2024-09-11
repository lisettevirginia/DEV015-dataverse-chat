// Función para obtener la API KEY desde Local Storage
export const getApiKey = () => {
  // Utiliza localStorage.getItem para obtener la API KEY almacenada
  return localStorage.getItem('apiKey');
};

// Función para guardar la API KEY en Local Storage
export const setApiKey = (key) => {
  // Utiliza localStorage.setItem para almacenar la API KEY
  localStorage.setItem('apiKey', key);
};
