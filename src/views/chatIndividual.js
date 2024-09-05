import renderHeader  from "./components/Renderheader.js"
import renderFooter from "./components/renderFooter.js";
import dataset from "./data/dataset.js";

export function chatIndividual() {
  const divHome = document.createElement('div');  
  divHome.appendChild (renderHeader());

  //Obtén el id de la url
  const id = window.location.pathname.split('/')[2];

  //encuentra el personaje por el id en el dataset
  const personaje = dataset.find(c => c.id === id);

  if (!personaje){
    //manejo del caso en que el personaje no se encuentre
    return document.createElement('div').innerText = 'Personaje no encontrado';
  }
  //se crea el contenedor para la vista del personaje
  let viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h1>${personaje.name}</h1>
    <img src="${personaje.image}" alt="${personaje.name}" />
    <p>${personaje.shortDescription}</p>
  `;

  viewEl = document.createElement('div');
  viewEl.innerHTML = `
    <h2>Chat Individual</h2>
    <p>Aquí puedes chatear con un personaje seleccionado.</p>
    <div id="chat-container">
      <!-- Aquí irá el contenido del chat -->
    </div>
  `;
  divHome.appendChild(viewEl)
  divHome.appendChild (renderFooter());
  
  return divHome;
}
export default chatIndividual;
