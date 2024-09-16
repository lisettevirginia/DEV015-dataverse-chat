import characters from '../data/dataset.js';

export function filterCharactersByFamily(familia) {
  // Filtra personajes por familia
  return characters.filter(character => {
    return character.facts.familia.toLowerCase() === familia.toLowerCase();
  });
}

export function sortCharactersByName(characters, sortBy, order) {
  const sortedCharacters = [...characters];
  return sortedCharacters.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]); // Orden ascendente
    } else if (order === 'des') {
      return b[sortBy].localeCompare(a[sortBy]); // Orden descendente
    }
    return 0; // Por si acaso `order` no es 'asc' ni 'des'
  });
}

export function filterAndSortCharacters(familia, order) {
  // Filtra y luego ordena los personajes
  let filteredCharacters = familia ? filterCharactersByFamily(familia) : characters;
  if (order) {
    filteredCharacters = sortCharactersByName(filteredCharacters, 'name', order);
  }
  return filteredCharacters;
}

export function getCharacters() {
  return new Promise ((resolve) => {
    setTimeout(() => 
    {
      resolve (characters);
    }, 1000) //retraso de 1 seg.
  });
}

// Función para obtener un solo personaje por ID
export const getCharacterById = async (id) => {
  try {
    const characters = await getCharacters(); // Llamamos a la función que devuelve todos los personajes
    return characters.find(character => character.id === id); // Filtramos el personaje por su ID
  } catch (error) {
    return null; // En caso de error
  }
};


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
