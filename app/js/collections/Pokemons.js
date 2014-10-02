define([
  'underscore',
  'backbone',
  'localstorage',
  'models/Pokemon'
  ],
  function(_, Backbone, localstorage, Pokemon) {
    Pokemons = Backbone.Collection.extend({
      model: Pokemon,
    })
    return Pokemons
  }
);
