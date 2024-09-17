// Importas la función `filterData` desde tu archivo de funciones, que se encuentra en '../src/lib/dataFunction.js'.
// Esta es la función que filtra los datos según ciertos criterios.
import { filterData } from '../src/lib/dataFunction.js';

// Importas los datos de los personajes desde el archivo 'dataset.js'. 
// `characters` es un array de objetos con la información de los personajes.
import characters from '../src/data/dataset.js';

// Aquí defines una suite de pruebas usando `describe`. 
// Dentro de esta suite pruebas la función `filterData` con diferentes casos.
describe("filterData", () => {

  // Primera prueba: Filtrar por familia "Bridgerton"
  // Llamas a `filterData` pasando `characters` como datos, el campo "familia", y el valor "Bridgerton".
  // La función debería devolver solo los personajes cuya familia sea "Bridgerton".
  // Luego comparas el número de personajes filtrados con el valor esperado (9).
  it("should filter characters by family and return the quantity of Bridgertons", () => {
    const totalBridgertons = filterData(characters, "familia", "Bridgerton");
    expect(totalBridgertons.length).toBe(9); // Ajusta según el número real de Bridgertons
  });

  // Segunda prueba: Filtrar por familia "Featherington"
  // Similar a la primera prueba, filtras los personajes cuya familia es "Featherington".
  // Luego, verificas que el número de personajes filtrados sea 6.
  it("should filter characters by family and return the quantity of Featheringtons", () => {
    const totalFeatheringtons = filterData(characters, "familia", "Featherington");
    expect(totalFeatheringtons.length).toBe(6); // Ajusta según el número de Featheringtons
  });

  // Tercera prueba: Filtrar personajes por estado civil "Casado"
  // Aquí filtras los personajes cuyo campo `sitSentimental` (situación sentimental) sea "Casado".
  // Después, verificas que el número de personajes casados sea 7.
  it("should filter characters by marital status and return the quantity of married characters", () => {
    const totalMarried = filterData(characters, "sitSentimental", "Casado");
    expect(totalMarried.length).toBe(7); // Ajusta según cuántos están casados
  });

  // Cuarta prueba: Filtrar personajes por estado civil "Soltero"
  // Esta prueba es similar a la anterior, pero en vez de "Casado", ahora filtras por "Soltero".
  // Luego, verificas que el número de personajes solteros sea 2.
  it("should filter characters by marital status and return the quantity of single characters", () => {
    const totalSingle = filterData(characters, "sitSentimental", "Soltero");
    expect(totalSingle.length).toBe(2); // Ajusta según cuántos están solteros
  });
});
