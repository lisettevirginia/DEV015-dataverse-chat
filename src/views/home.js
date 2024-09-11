import renderHeader from '../components/Renderheader.js';
import personajes from '../components/personajes.js'; 
import { getCharacters, filterAndSortCharacters, calcularEstadisticas } from '../lib/dataFunction.js';
import renderFooter from '../components/renderFooter.js';
import { navigateTo } from '../navigate.js';

// Define la función navigateToApiKeyPage
function navigateToApiKeyPage() {
  navigateTo('/api-key');  // Asegúrate de usar la ruta correcta
}

// Función responsable de crear y estructurar la página de inicio
async function home() {
  // Crea un div que será el contenedor principal para la página de inicio
  const divHome = document.createElement('div'); 

  // Genera el header de la página y lo asigna a la constante header
  const header = renderHeader();
  // Añade el header al divHome
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

  // Crea un elemento nav para contener el filtro/ordenado/botón
  const navOrdenFiltroBoton = document.createElement('nav');
  navOrdenFiltroBoton.classList.add('nav-container');

  // Crea un div para agrupar el filtro, el ordenado y el botón
  const filtroOrdenBotonContainer = document.createElement('div');
  filtroOrdenBotonContainer.classList.add('filtro-ordenado-boton-container');

  // Añade el componente filtrado al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(filtrado());
  // Añade el componente ordenado al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(ordenado());
  // Añade el componente botón al filtroOrdenBotonContainer
  filtroOrdenBotonContainer.appendChild(boton());

  // Añade el contenedor con los elementos de filtro, ordenado y botón al nav
  navOrdenFiltroBoton.appendChild(filtroOrdenBotonContainer);
  // Añade el nav al divHome
  divHome.appendChild(navOrdenFiltroBoton);

  // Crea un contenedor para los personajes y lo asigna a personajesContainer
  const personajesContainer = document.createElement('div');
  personajesContainer.id = 'personajes-container'; 
  divHome.appendChild(personajesContainer);

  // Calcula y muestra las estadísticas al cargar la página 
  const allCharacters = await getCharacters();  // Obtén todos los personajes
  const stats = calcularEstadisticas(allCharacters);  // Calcula estadísticas
  const resultadoEstadisticas = document.createElement('div');
  resultadoEstadisticas.id = 'resultado-estadisticas';
  resultadoEstadisticas.innerHTML = `
    <p>Casados: ${stats.casados}</p>
    <p>Solteros: ${stats.solteros}</p>
    <p>Viudos: ${stats.viudos}</p>
    <p>Amantes: ${stats.amantes}</p>
  `;
  divHome.appendChild(resultadoEstadisticas);

  // Carga inicial de los personajes
  personajesContainer.appendChild(personajes(allCharacters));

  // Añadir evento de click para la navegación a cada tarjeta de personaje
  personajesContainer.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.character-card')) {
      const characterId = event.target.getAttribute('data-id');
      navigateTo(`/character/${characterId}`);
    }
  });

  // Agrega el footer
  const footer = renderFooter();
  divHome.appendChild(footer);

  // Retorna el divHome, que contiene toda la estructura de la página de inicio
  return divHome;
}

// Declara la función filtrado, que genera el menú de filtrado
const filtrado = () => {
  const filtradoEl = document.createElement('nav');
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

  const selectFilter = filtradoEl.querySelector('#family-filter');
  selectFilter.addEventListener('change', async (event) => {
    const selectedValue = event.target.value;
    const personajesContainer = document.getElementById('personajes-container');
    if (!personajesContainer) return;

    const filteredCharacters = filterAndSortCharacters(selectedValue, document.querySelector('#alfabetico').value);

    personajesContainer.innerHTML = '';
    personajesContainer.appendChild(personajes(filteredCharacters));

    // Recalcula y muestra las estadísticas después de filtrar
    const stats = calcularEstadisticas(filteredCharacters);
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    resultadoEstadisticas.style.display = 'block';
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;
  });

  return filtradoEl;
};

// Declara la función ordenado, que generará un elemento de ordenación
const ordenado = () => {
  const ordenadoEl = document.createElement('nav');
  ordenadoEl.innerHTML = `
    <label for="alfabetico" id="alfabe">Ordenar por:</label>
    <select id="alfabetico" data-testid="select-sort" name="alfabetico">
      <option value=""> </option>
      <option value="asc">Ordenar A-Z</option>
      <option value="des">Ordenar Z-A</option>
    </select>   
  `;

  ordenadoEl.querySelector('#alfabetico').addEventListener('change', async (event) => {
    const order = event.target.value;
    const family = document.querySelector('#family-filter').value;

    const sortedCharacters = filterAndSortCharacters(family, order);

    const personajesContainer = document.getElementById('personajes-container');
    personajesContainer.innerHTML = '';
    personajesContainer.appendChild(personajes(sortedCharacters));

    // Recalcular y mostrar las estadísticas después de ordenar
    const stats = calcularEstadisticas(sortedCharacters);
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    resultadoEstadisticas.style.display = 'block';
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;
  });

  return ordenadoEl;
};

// Declara la función boton, que creará un botón para despejar los filtros y ordenado
const boton = () => {
  const botonEl = document.createElement('div');
  botonEl.innerHTML = `
    <button type="button" data-testid="button-clear">Despejar</button>
  `;
  botonEl.querySelector('button').addEventListener('click', async () => {
    const personajesContainer = document.getElementById('personajes-container');
    const allCharacters = await getCharacters();  // Obtén todos los personajes

    // Limpia el contenedor de personajes
    personajesContainer.innerHTML = '';
    personajesContainer.appendChild(personajes(allCharacters));

    // Recalcular y mostrar las estadísticas después de limpiar filtros y ordenación
    const stats = calcularEstadisticas(allCharacters);
    const resultadoEstadisticas = document.getElementById('resultado-estadisticas');
    resultadoEstadisticas.style.display = 'block';
    resultadoEstadisticas.innerHTML = `
      <p>Casados: ${stats.casados}</p>
      <p>Solteros: ${stats.solteros}</p>
      <p>Viudos: ${stats.viudos}</p>
      <p>Amantes: ${stats.amantes}</p>
    `;

    // Limpia los selectores de filtro y orden
    document.querySelector('#family-filter').value = '';
    document.querySelector('#alfabetico').value = '';
  });

  return botonEl;
};



// Exporta la función home para ser utilizada en otras partes del proyecto
export default home;
