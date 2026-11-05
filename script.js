import { Pokemon } from "./pokemon.js";
let thing;
let thingy;
let number = 12;
let offset = 0;
let limit = 12;
let id;
let hi;
let yo;
let search2 = false;
let search = document.getElementById("search");
const submit = document.getElementById("submit");
const first = document.getElementById("first");
const loadBtn = document.getElementById("load");
let element;
let thingy2;
let coolcounter = document.getElementById("counter")

thing1(offset);

loadBtn.addEventListener("click", () => {
  offset += 12;
  thing1(offset);
});

first.addEventListener("click", () => {
  pokemonDiv.innerHTML = "";
  offset = 0;
  limit = 12;
  search2 = false;
  loadBtn.disabled = false;
  thing1();
});

submit.addEventListener("click", () => {
  search = document.getElementById("search").value.toLowerCase();
  if (search != "") {
    submit.disabled = true;
    first.disabled = true;
    loadBtn.disabled = true;
    pokemonDiv.innerHTML =
      "<p style='font-size:25px;' id='loading'>Loading</p>";
    offset = 0;
    limit = 1025;

    search2 = true;
    setTimeout(() => {
      if (document.getElementById("loading")) {
        pokemonDiv.innerHTML =
          "<p style='font-size:25px;'>Pokemon Not Found</p>";
        submit.disabled = false;
        first.disabled = false;
      }
    }, 5000);
    thing1();
  } else {
    loadBtn.disabled = true;
    pokemonDiv.innerHTML =
      "<p style='font-size:25px;'>Enter something in the search bar or press show first 12</p>";
  }
});

function thing1() {
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((name) => {
      thing = name.results;
      thing2(thing);
    });
}
function thing2(thing) {
  for (let thin of thing) {
    fetch(thin.url)
      .then((response) => response.json())
      .then((name) => {
        let poke = new Pokemon(name);
        // console.log(poke);
        // console.log("poke above");
        yo = String(name.id);
        if (search2 == false) {
          createPokemonCards(poke);
        } else if (
          (search2 == true && name.name.includes(search)) ||
          String(poke.id).includes(search)
        ) {
          element = document.getElementById("loading");
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
          createPokemonCards(poke);
        }
      });
  }
}

function makeUpperCase(string) {
  return string[0].toUpperCase() + string.slice(1, string.length);
}

function getElement(name) {
  thingy2 = "";

  for (thingy of name.types) {
    thingy2 +=
      `<span class="type ${thingy.type.name}">${makeUpperCase(thingy.type.name)}</span>` +
      "  ";
  }
  submit.disabled = false;
  first.disabled = false;
  return `
  <div class="card">
        <h3 class="pokeId">#${name.id}</h3>
        <img src="${name.image}"></img>
        <h3>${makeUpperCase(name.name)}</h3>
        <h4>${thingy2}</h3>
        <h4>HP: ${name.health}</h3>
        <h4>Attack: ${name.attackPower}</h3>
        <h4>Defense: ${name.defense}</h3>
    </div>
    `;
}

function createPokemonCards(pokemon) {
  coolcounter.innerHTML = `Pokemon Objects Created: ${Pokemon.totalPokemon}`
  pokemonDiv.innerHTML += getElement(pokemon);
}
