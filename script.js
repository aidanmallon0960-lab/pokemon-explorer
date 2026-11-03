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

thing1(offset);

loadBtn.addEventListener("click", () => {
  offset += 12;
  thing1(offset);
});

first.addEventListener("click", () => {
  pokemonDiv.innerHTML = "";
  offset = 0;
  limit = 12;
  search.innerHTML = "";
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
    thing1();
    setTimeout(() => {
      if (pokemonDiv.innerHTML == "") {
        pokemonDiv.innerHTML +=
          "<p style='font-size:25px;'>Pokemon Not Found</p>";
        submit.disabled = false;
        first.disabled = false;
      }
    }, 5000);
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
  for (thin of thing) {
    fetch(thin.url)
      .then((response) => response.json())
      .then((name) => {
        yo = String(name.id);
        if (search2 == false) {
          createPokemonCards(name);
        } else if (
          (search2 == true && name.name.includes(search)) ||
          String(name.id).includes(search)
        ) {
          element = document.getElementById("loading");
          if (element && element.parentNode) {
            element.parentNode.removeChild(element);
          }
          createPokemonCards(name);
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
        <img src="${name.sprites.front_default}"></img>
        <h3>${makeUpperCase(name.name)}</h3>
        <h4>${thingy2}</h3>
        <h4>HP: ${name.stats[0].base_stat}</h3>
        <h4>Attack: ${name.stats[1].base_stat}</h3>
        <h4>Defense: ${name.stats[2].base_stat}</h3>
    </div>
    `;
}

function createPokemonCards(pokemon) {
  pokemonDiv.innerHTML += getElement(pokemon);
}
