import renderHeader from '../components/Renderheader.js';
import personajes from '../components/personajes.js'; 
import dataset from '../data/dataset.js';
import renderFooter from '../components/renderFooter.js';
import { calcularEstadisticas, getCharacters } from '../lib/dataFunction.js';
import { navigateTo } from '../navigate.js';

// Define la función navigateToApiKeyPage
function navigateToApiKeyPage() {
  navigateTo('/api-key');  // Asegúrate de usar la ruta correcta
}
//responsable de crear y estructurar la página de inicio
function home() {
  //crea un div que será el contenedor principal para la página de inicio
  const divHome = document.createElement('div');

  //genera el header de la página y lo asigna a la constante header
  const header = renderHeader();
  
  //añade el header al divHome
  divHome.appendChild(header);

  // Sección para el botón de API Key
  const botonApiKey = document.createElement('section');
  divHome.appendChild(botonApiKey);
  botonApiKey.innerHTML = `
    <button id="apiKeyButton">Ir a API Key</button>
  `;
  // Añadir el listener al botón para usar la función navigateToApiKeyPage
  const apiKeyButton = botonApiKey.querySelector('#apiKeyButton');
  apiKeyButton.addEventListener('click', navigateToApiKeyPage);

  //crea un elemento nav para contener el filtro/ordenado/botón
  const navOrdenFiltroBoton = document.createElement('nav');
  //añade clase nav-container al nav, lo que permite aplicarle estilos
  navOrdenFiltroBoton.classList.add('nav-container');


  //crea un div para agrupar el filtro, el ordenado y el botón
  const filtroOrdenBotonContainer = document.createElement('div');
  //añade una clase, lo que permite aplicarle estilos
  filtroOrdenBotonContainer.classList.add('filtro-ordenado-boton-container');

  //añade el componente filtrado al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(filtrado());
  //añade el componente ordenado al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(ordenado());
  //añade el componente boton al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(boton());

  //añade el contenedor con los elementos de filtro, ordenado y botón al nav.
  navOrdenFiltroBoton.appendChild(filtroOrdenBotonContainer);
  //añade el nav al divHome
  divHome.appendChild(navOrdenFiltroBoton);

  //CONTENEDOR CON LA LISTA DE PERSONAJES Y LO ASIGNA personajesContainer
  //llama a la función personajes pasando el dataset para generar 
  const personajesContainer = personajes(dataset); 
  //asigna el id 'personajes-container' al contenedor de personajes 
  //para facilitar su manipulación
  personajesContainer.id = 'personajes-container'; 
  //añade el contenedor de personajes al divHome
  divHome.appendChild(personajesContainer);
  
  // Añadir evento de click para la navegación a cada tarjeta de personaje
  personajesContainer.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', (event) => {
    // Obtener el ID del personaje del atributo data-id de la tarjeta
      const characterId = event.currentTarget.getAttribute('data-id');
      // Navegar a la vista individual del personaje utilizando navigateTo y pasando el ID
      navigateTo(`/character/${characterId}`);
    });
  });

  //CONTENEDOR PARA MOSTRAR LAS ESTADISTICAS
  //crea un div para mostrar las estadísticas
  const resultadoEstadisticas = document.createElement('div');
  //asigna el id 'resultado-estadisticas' a este contenedor
  resultadoEstadisticas.id = 'resultado-estadisticas';
  
  //añade el contenedor de estadísticas al divHome
  divHome.appendChild(resultadoEstadisticas);

  //CALCULAR Y MOSTRAR LAS ESTADISTICAS AL CARGAR LA PAGINA 
  //Calcula las estadísticas llamando a calcularEstadisticas y pasando 
  //el resultado de getCharacters().
  const stats = calcularEstadisticas(dataset);
  //rellena el resultadoEstadisticas con el HTML que muestra las estadísticas
  resultadoEstadisticas.innerHTML = `
    <p>Casados: ${stats.casados}</p>
    <p>Solteros: ${stats.solteros}</p>
    <p>Viudos: ${stats.viudos}</p>
    <p>Amantes: ${stats.amantes}</p>
  `;

  // AGREGA EL FOOTER
  //llama a la función renderFooter para generar el footer y lo asigna a footer
  const footer = renderFooter();
  //añade el footer al divHome
  divHome.appendChild(footer);

  //retorna el divHome, que contiene toda la estructura de la página de inicio
  return divHome;
}

//declara la función filtrado, que genera el menú de filtrado
const filtrado = () => {
  //crea un elemento nav para contener el formulario de filtrado
  const filtradoEl = document.createElement('nav');
  //rellena el nav con un formulario HTML que incluye un select para filtrar 
  //por familia.
  filtradoEl.innerHTML = `
    <form id="filter-form">
      <label for="family-filter" id="famFilter">Filtrar por:</label>
      <select id="family-filter" data-testid="select-filter" name="familyFilter">
        <option value=""> </option>
        <option value="bridgerton">Bridgerton</option>
        <option value="featherington">Featherington</option>
        <option value="basset">Basset</option>
        <option value="danbury">Danbury</option>
        <option value="real">Realeza</option>
        <option value="No Tiene">No tiene</option>
        <option value="mondrich">Mondrich</option>
        <option value="crane">Crane</option>
        <option value="cowper">Cowper</option>
        <option value="granville">Granville</option>
      </select>
    </form>
  `;

  //selecciona el select de filtrado
  const selectFilter = filtradoEl.querySelector('#family-filter');
  //añade un evento change para ejecutar código cuando se seleccione una opción
  //diferente en el filtro
  selectFilter.addEventListener('change', (event) => {
    //obtiene el valor seleccionado
    const selectedValue = event.target.value;

    //selecciona el contenedor de personajes
    const personajesContainer = document.getElementById('personajes-container');
    //si no existe el contenedor de personajes, la función termina
    if (!personajesContainer) {
      return;
    }

    //crea una constante llamada filteredCharacters que almacenará los 
    //personajes filtrados,Utiliza el método filter en el arreglo dataset para
    //filtrar los personajes. personaje => { define una función flecha 
    //que se ejecutará para cada elemento (personaje) del arreglo.
    const filteredCharacters = dataset.filter(personaje => {

      //si familia existe, la convierte a minúsculas (toLowerCase()), 
      //de lo contrario, asigna una cadena vacía ('')
      const family = personaje.facts.familia ? personaje.facts.familia.toLowerCase() : ''; 
      //retorna true si selectedValue (el valor seleccionado del filtro) 
      //es una cadena vacía o si family coincide con selectedValue, 
      //esto decide si el personaje se incluirá en filteredCharacters
      return selectedValue === '' || family === selectedValue.toLowerCase();
    });

    //limpia el contenido del contenedor de personajes (personajesContainer)
    //eliminando cualquier HTML existente dentro de él
    personajesContainer.innerHTML = ''; 

    //genera el contenido HTML para los personajes filtrados 
    //y lo almacena en personajesContent
    const personajesContent = personajes(filteredCharacters);
    //añade el contenido generado a personajesContainer, 
    //mostrando los personajes filtrados en la página
    personajesContainer.appendChild(personajesContent);
    //RECALCULAR Y MOSTRAR LAS ESTADISTICAS DESPUES DE FILTRAR
    //calcula las estadísticas de los personajes filtrados 
    //utilizando la función calcularEstadisticas 
    //y almacena el resultado en stats
    const stats = calcularEstadisticas(filteredCharacters);
    //selecciona el contenedor donde se mostrarán las estadísticas usando su ID
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    //asegura que el contenedor de estadísticas esté visible al establecer
    // su estilo display a 'block'
    resultadoEstadisticas.style.display = 'block';
    //actualiza el HTML del contenedor de estadísticas para mostrar las estadísticas calculadas 
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;
  });

  return filtradoEl;
};

//declara la función ordenado, que generará un elemento de ordenación
const ordenado = () => {
  //crea un elemento nav para contener el menú de ordenación
  const ordenadoEl = document.createElement('nav');
  //añade un select HTML dentro del nav con opciones para ordenar los personajes
  ordenadoEl.innerHTML = `
    <label for="alfabetico" id="alfabe">Ordenar por:</label>
    <select id="alfabetico" data-testid="select-sort" name="alfabetico">
      <option value=""> </option>
      <option value="asc">Ordenar A-Z</option>
      <option value="des">Ordenar Z-A</option>
    </select>   
  `;

  //añade un evento change al select para que cuando se cambie la opción 
  //seleccionada, se ejecute el código para ordenar los personajes
  ordenadoEl.querySelector('#alfabetico').addEventListener('change', (event) => {
    //Obtiene el valor seleccionado del select (ascendente o descendente) y lo almacena en order.
    const order = event.target.value;
    //obtiene el valor del filtro de familia actualmente seleccionado
    const family = document.querySelector('#family-filter').value;

    //filtra los personajes basándose en la familia seleccionada,
    //similar al proceso anterior
    const filteredCharacters = dataset.filter(personaje => 
      family === '' || personaje.facts.familia.toLowerCase() === family.toLowerCase()
    );

    //Ordena los personajes filtrados
    const sortedCharacters = filteredCharacters.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (order === 'des') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    //Selecciona el contenedor de personajes
    const personajesContainer = document.getElementById('personajes-container');
    //limpia el contenedor de personajes
    personajesContainer.innerHTML = ''; 
    //añade los personajes ordenados al contenedor
    personajesContainer.appendChild(personajes(sortedCharacters));

    // Recalcular y mostrar las estadísticas después de ordenar
    const stats = calcularEstadisticas(sortedCharacters);
    //selecciona el contenedor de estadísticas
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    //asegura que el contenedor de estadísticas esté visible
    resultadoEstadisticas.style.display = 'block'; // Asegúrate de que esté visible
    //actualiza el HTML para mostrar las estadísticas calculadas
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;
  });

  //Retorna el elemento nav con el menú de ordenación para ser usado 
  //en la interfaz.
  return ordenadoEl;
};

//declara la función boton,q creará un botón para despejar los filtros y ordenado
const boton = () => {
  //crea un elemento div para contener el botón
  const botonEl = document.createElement('div');
  //añade un botón HTML dentro del div
  botonEl.innerHTML = `
    <button type="button" data-testid="button-clear">Despejar</button>
  `;
  //añade un evento click al botón para ejecutar código cuando se haga clic en él
  botonEl.querySelector('button').addEventListener('click', () => {
    //selecciona el contenedor de personajes
    const personajesContainer = document.getElementById('personajes-container');
    //limpia el contenido del contenedor de personajes
    personajesContainer.innerHTML = ''; 
    //añade todos los personajes (sin filtrar ni ordenar) al contenedor
    personajesContainer.appendChild(personajes(dataset)); 

    //Resetea el formulario de filtros,eliminando cualquier selección anterior
    document.querySelector('#filter-form').reset(); 
    //Resetea el valor del menú de ordenación    
    document.querySelector('#alfabetico').value = ''; 

    // Recalcular y mostrar las estadísticas después de despejar
    const stats = calcularEstadisticas(getCharacters());
    //selecciona el contenedor de estadísticas
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    
    //asegura que el contenedor de estadísticas esté visible
    resultadoEstadisticas.style.display = 'block'; 
    //actualiza el HTML para mostrar las estadísticas calculadas
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;
  });
  //retorna el div que contiene el botón para ser usado en la interfaz
  return botonEl;
};
//exporta la función home como el valor por defecto del módulo, 
//permitiendo que otros archivos la importen y la usen
export default home;


