define([
  'backbone',
  'localstorage',
  'models/Pokemon'
  ],
  function() {
    Pokemons = Backbone.Collection.extend({
      model: Pokemon,
    });
    Moves = Backbone.Collection.extend({
      mode: Move
    });
    Abilities = Backbone.Collection.extend({
      mode: Ability
    });
    CaughtPokemons = Backbone.Collection.extend({
      model:Pokemon,
      localStorage: new Backbone.LocalStorage("caughtPokemons"),
    });
  }
);
