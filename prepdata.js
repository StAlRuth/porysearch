// Require fs in order to perform filesystem operations
var fs = require('fs');

// map is an array that contains all of the types such that a "0 type" move
// (such as Tackle) gets properly converted to a "Normal" type move.
var map = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock",
    "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric",
    "Psychic", "Ice", "Dragon", "Dark", "Fairy"];

// Parses pokemon data, make types words instead of numbers to ease computing in the client
// The site's slow as is
(function(){
var pokemonData = JSON.parse(fs.readFileSync("app/rawdata/pokemon.poke", "utf-8"), function(key, value) {
  if (key === "types") {
    var result = [];
    for(var i = 0; i < value.length; i++) {
      result.push(map[value[i]]);
    }
    return result;
  }
  return value;
});

// Set the TM value of each pokemon to the TMs AND HMs it can learn.
// Also delete HMs to prevent needless clutter.
for(var i = 0; i < pokemonData.length; i++) {
  var wat = pokemonData[i].tm.concat(pokemonData[i].hm);
  pokemonData[i].tm = wat;
  delete pokemonData[i].hm;
}

fs.writeFileSync("app/data/pokemon.json", JSON.stringify(pokemonData));
})();

//Prep move data in the same way we do the Pokemon data.
(function(){
var moveData = JSON.parse(fs.readFileSync("app/rawdata/move.poke"), function(key, value) {
  if (key === "type") {
    return map[value];
  }
  return value;
});

fs.writeFileSync("app/data/move.json", JSON.stringify(moveData));

//Prepare TM and HM lists.

var moveData = JSON.parse(fs.readFileSync("app/rawdata/move.poke"));
var machines = [];
var tm = new Array(100);
var hm = new Array(6);

for(var i = 0; i < moveData.length; i++) {
  if(moveData[i].tm.toString().charAt(0) === 'T') {
    tm[Number(moveData[i].tm.substr(2)) - 1] = moveData[i]["name"];
  } else if (moveData[i].tm.toString().charAt(0) === 'H') {
    hm[Number(moveData[i].tm.substr(2)) - 1] = moveData[i]["name"];
  }
}

for(var i = 0; i < tm.length; i++) {
  machines.push({"name":"TM"+(i+1),"move":tm[i]});
}

for(var i = 0; i < hm.length; i++) {
  machines.push({"name":"HM"+(i+1),"move":hm[i]});
}

fs.writeFileSync('app/data/machine.json', JSON.stringify(machines));
})();
