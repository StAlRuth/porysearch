define([
  'underscore',
  'backbone',
  'localstorage',
  'models/Pokemon',
  'views/CaughtTableView',
  'views/PokemonsTableView'
  ],
  function(_, Backbone,  LocalStorage ) {
    var CaughtPokemons = Backbone.Collection.extend({
      model:Pokemon,
      localStorage: new Backbone.LocalStorage("caughtPokemons"),
      addPokemon: function(model) {
        var isDupe = this.any(function(_x) {
          return _x.get('name') === model.attributes.name
        })
        if(!isDupe) {
          this.create(model.toJSON());
          caughtTableView = new CaughtTableView({
            model: model
          })
        }
      },
      removePokemon: function(model) {
        pokemonsTableView = new PokemonsTableView;
        pokemonsTableView.unCatch(model);
        x = this.where({name:model.attributes.name})[0]
        x = this.get(x.cid)
        x.destroy();
      }
    })
    return CaughtPokemons;
  }
);
