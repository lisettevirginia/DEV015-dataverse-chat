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
const renderView = (pathname, props = {}) => {
  rootEl.innerHTML = ''; // Limpia el contenido del elemento root
  console.log (pathname);

  // Busca la ruta más similar en ROUTES
  let matchedRoute = null;
  let matchedParams = {};

  Object.keys(ROUTES).every(route => {
    // Convierte la ruta en una expresión regular
    //const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '([^/]+)')}$`);
    const match = pathname.startsWith(route);

    if (match) {
      const vistaPathname = ROUTES[route] || ROUTES["/page-error"];
      const viewElement = vistaPathname({ ...props, ...matchedParams });
      rootEl.append(viewElement);
      return false;
      /*matchedRoute = route;
      const keys = (route.match(/:\w+/g) || []).map(key => key.substring(1));
      matchedParams = keys.reduce((params, key, index) => {
        params[key] = match[index + 1];
        return params;
      }, {});*/
    }
    return true;
  });

  // Si se encontró una ruta coincidente, renderiza esa vista
/*   if (matchedRoute) {
    const vistaPathname = ROUTES[matchedRoute] || ROUTES["/page-error"];
    console.log(matchedRoute)
    const viewElement = vistaPathname({ ...props, ...matchedParams });
    rootEl.append(viewElement);
  } else {
    // Si no hay coincidencias, renderiza la página de error
    renderView('/page-error');
  } */
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
