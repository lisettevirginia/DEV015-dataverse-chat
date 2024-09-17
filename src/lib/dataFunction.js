import characters from '../data/dataset.js';

// Función genérica para filtrar personajes por cualquier propiedad (familia, sitSentimental, etc.)
export function filterData(data, key, value) {
  return data.filter(item => item.facts && item.facts[key] && item.facts[key].toLowerCase() === value.toLowerCase());
}

// Filtrar personajes por familia específica
export function filterCharactersByFamily(familia) {
  return filterData(characters, 'familia', familia);
}

// Ordenar personajes por nombre
export function sortCharactersByName(data, sortBy, order) {
  const sortedCharacters = [...data];
  return sortedCharacters.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]); // Orden ascendente
    } else if (order === 'des') {
      return b[sortBy].localeCompare(a[sortBy]); // Orden descendente
    }
    return 0;
  });
}

// Filtrar y ordenar personajes
export function filterAndSortCharacters(familia, order) {
  let filteredCharacters = familia ? filterCharactersByFamily(familia) : characters;
  if (order) {
    filteredCharacters = sortCharactersByName(filteredCharacters, 'name', order);
  }
  return filteredCharacters;
}

// Obtener todos los personajes (simulación de API)
export function getCharacters() {
  return new Promise((resolve) => {
    setTimeout(() => { //aqui hay un callback / funciones que se pasan como argumentos 
      resolve(characters);
    }, 1000); // retraso de 1 seg.
  });
}

// Obtener un solo personaje por ID
export const getCharacterById = async (id) => {
  try {
    const characters = await getCharacters(); // Llamamos a la función que devuelve todos los personajes
    return characters.find(character => character.id === id); // Filtramos el personaje por su ID
  } catch (error) {
    return null; // En caso de error
  }
};

// Calcular estadísticas de personajes (casados, solteros, etc.)
export function calcularEstadisticas(data) {
  return data.reduce((estadisticas, character) => {
    const sitSentimental = character.facts.sitSentimental ? character.facts.sitSentimental.toLowerCase() : '';

    if (sitSentimental.includes("casad")) {
      estadisticas.casados++;
    } else if (sitSentimental.includes("solter")) {
      estadisticas.solteros++;
    } else if (sitSentimental.includes("viud")) {
      estadisticas.viudos++;
    } else if (sitSentimental.includes("amante")) {
      estadisticas.amantes++;
    }
    return estadisticas;
  }, {
    casados: 0,
    solteros: 0,
    viudos: 0,
    amantes: 0
  });
}



