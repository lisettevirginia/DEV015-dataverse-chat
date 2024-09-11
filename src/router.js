//Este objeto se utilizará para almacenar las rutas de la aplicación
let ROUTES = {};
//Esta variable almacenará el elemento raíz (root)
let rootEl;

// Esta función toma un parámetro el, que representa el elemento raíz del DOM
export const setRootEl = (el) => {
  //configura cuál será el contenedor principal de la aplicación 
  rootEl = el;
  //verificar que el rootEl se haya configurado correctamente.
  return rootEl; // Llama al root que está en el main.js
};

//es un objeto que mapea rutas a vistas o componentes.
export const setRoutes = (routes) => {
  //establece las rutas disponibles en la aplicación.
  ROUTES = routes;
  //verificar que el ROUTER se haya configurado correctamente.

  return ROUTES;
};

//convierte una cadena de consulta(query string)en un objeto JS.
const queryStringToObject = (queryString) => {
  //Crea una instancia de URLSearchParams, que permite trabajar con cadenas de consulta
  const params = new URLSearchParams(queryString);
  //se almacenarán las claves y valores de la cadena de consulta.
  const result = {};
  //Recorre cada par clave-valor en params y los asigna al objeto result.
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  //contiene todos los parámetros de la cadena de consulta como propiedades del objeto
  return result;
};
// renderiza la vista correspondiente a una ruta específica.
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



//que permite navegar a una nueva ruta sin recargar la página
export const navigateTo = (pathname, props = {}) => {
  const urlParams = new URLSearchParams(props).toString();
  const fullPath = urlParams ? `${pathname}?${urlParams}` : pathname;
  window.history.pushState({}, pathname, window.location.origin + fullPath);
  renderView(pathname, props);
};

// se ejecuta cuando cambia la URL
export const onURLChange = (location) => {
  //extrae el pathname (la ruta) y search (la cadena de consulta) del objeto location.
  const { pathname, search } = location;
  //convierte la cadena de consulta en un objeto props que se puede pasar a la vista correspondiente.
  const props = queryStringToObject(search);
  renderView(pathname, props);
};
