class Pokemon {
  static totalPokemon = 0;
  //  constructor({id, name, image, types, maxHealth, health, attackPower, defense}) {
  constructor(pokeData) {
    // console.log(pokeData);
    this.id = pokeData.id;
    this.name = pokeData.name;
    this.image = pokeData.sprites.front_default;
    this.types = pokeData.types;
    this.maxHealth = pokeData.stats[0].base_stat;
    this.health = this.maxHealth;
    this.attackPower = pokeData.stats[1].base_stat;
    this.defense = pokeData.stats[2].base_stat;
    Pokemon.totalPokemon++;
  }
  takeDamage(amount) {
    this.health -= amount;
  }

  heal(amount) {
    this.health += amount;
  }

  resetHealth() {
    this.health = this.maxHealth;
  }

  get health() {
    return this._health;
  }
  set health(value) {
    this._health = Math.max(0, value);
  }
  get healthPercent() {
    return (this.health / this.maxHealth) * 100 + "%";
  }
  get isFainted() {
    return this.health === 0;
  }

  static getTotalPokemon() {
    return Pokemon.totalPokemon;
  }
}

export { Pokemon };

// const pokemon = new Pokemon(
//   1,
//   "pika",
//   "image",
//   "yo",
//   100,
//   100,
//   "attackPower",
//   "defense",
// );

// pokemon.takeDamage(20);
// pokemon.heal(10);
// pokemon.resetHealth();
// pokemon.health = 50;

// console.log(pokemon.health);
// console.log(pokemon.healthPercent);
// console.log(pokemon.isFainted);

// console.log(Pokemon.getTotalPokemon());
