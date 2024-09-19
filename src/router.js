// Este objeto se utilizará para almacenar las rutas de la aplicación
let ROUTES = {};
// Esta variable almacenará el elemento raíz (root)
let rootEl;

// Esta función toma un parámetro el, que representa el elemento raíz del DOM
export const setRootEl = (el) => {
  // Configura cuál será el contenedor principal de la aplicación 
  rootEl = el;
  // Verifica que el rootEl se haya configurado correctamente.
  return rootEl; // Llama al root que está en el main.js
};

// Es un objeto que mapea rutas a vistas o componentes.
export const setRoutes = (routes) => {
  // Establece las rutas disponibles en la aplicación.
  ROUTES = routes;

  // Agregar nueva ruta para pruebas con API
  ROUTES['/test-api'] = async () => {
    const viewElement = document.createElement('div');

    // Realizar un GET cuando se navega a esta ruta
    getData();

    // Realizar un POST cuando se navega a esta ruta
    postData();

    viewElement.innerHTML = `<h2>Probando API</h2><p>Consulta la consola para ver los resultados de GET y POST.</p>`;
    
    return viewElement;
  };

  return ROUTES;
};

// Convierte una cadena de consulta (query string) en un objeto JS.
const queryStringToObject = (queryString) => {
  // Crea una instancia de URLSearchParams, que permite trabajar con cadenas de consulta
  const params = new URLSearchParams(queryString);
  // Se almacenarán las claves y valores de la cadena de consulta.
  const result = {};
  // Recorre cada par clave-valor en params y los asigna al objeto result.
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  // Contiene todos los parámetros de la cadena de consulta como propiedades del objeto
  return result;
};

// Renderiza la vista correspondiente a una ruta específica.
const renderView = async (pathname, props = {}) => {
  rootEl.innerHTML = ''; // Limpia el contenido del elemento root

  for (const route in ROUTES) {
    const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '([^/]+)')}$`);
    const match = pathname.match(routeRegex);

    if (match) {
      const matchedParams = {};
      const paramNames = route.match(/:\w+/g) || [];

      paramNames.forEach((paraName, index) => {
        matchedParams[paraName.substring(1)] = match[index + 1];
      });

      const viewFunc = ROUTES[route] || ROUTES["/page-error"];
      let viewElement;

      try {
        // Espera si la vista es una función que retorna una promesa
        viewElement = await viewFunc({ ...props, ...matchedParams });
      } catch (error) {
        viewElement = await ROUTES["/page-error"]();
      }

      rootEl.append(viewElement);
      return; // Termina la función después de renderizar la vista correcta
    }
  }

  // Si no se encontró ninguna ruta coincidente, carga la página de error una sola vez
  const errorView = await ROUTES["/page-error"]();
  rootEl.append(errorView);
};

// Que permite navegar a una nueva ruta sin recargar la página
export const navigateTo = (pathname, props = {}) => {
  const urlParams = new URLSearchParams(props).toString();
  const fullPath = urlParams ? `${pathname}?${urlParams}` : pathname;
  window.history.pushState({}, pathname, window.location.origin + fullPath);
  renderView(pathname, props);
};

// Se ejecuta cuando cambia la URL
export const onURLChange = (location) => {
  // Extrae el pathname (la ruta) y search (la cadena de consulta) del objeto location.
  const { pathname, search } = location;
  // Convierte la cadena de consulta en un objeto props que se puede pasar a la vista correspondiente.
  const props = queryStringToObject(search);
  renderView(pathname, props);
};

// Función para realizar un GET
const getData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts') // Puedes cambiar "posts" por otra ruta
    .then(response => response.json())
    .then(data => console.log('GET Response:', data)) // Muestra el resultado
    .catch(error => console.error('Error en GET:', error)); // Muestra el error si ocurre
};

// Función para realizar un POST
const postData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Nuevo Post',
      body: 'Contenido del nuevo post',
      userId: 1
    })
  })
    .then(response => response.json())
    .then(data => console.log('POST Response:', data)) // Muestra el resultado
    .catch(error => console.error('Error en POST:', error)); // Muestra el error si ocurre
};
