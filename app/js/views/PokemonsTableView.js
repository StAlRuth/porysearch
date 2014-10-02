define([
  'backbone',
  'jquery',
  'views/Search',
  'views/PokemonsRowView',
  'models/Pokemon',
  'collections/Pokemons'
  ],
  function(Backbone) {
    PokemonsTableView = Backbone.View.extend({
      el: $(".pokemon-table"),
      get: function(data) {
        data = $(data).data();
        pokemonname = data.name;
        pokemonid = data.number;
        dapokemon = Pokemonlist.where({number:parseInt(pokemonid), name:pokemonname});
        pokemonStatView = new ContentView({
          model: dapokemon
        });
      },
      renderPokemonRowView: function(pokemon) {
        // Create a new postView
        var pokemonRowView = new PokemonRowView({
          model : pokemon
        });
        // Append it to the container
        this.$el.children("tbody").append(pokemonRowView.el);
        pokemonRowView.render();
      },
      unCatch: function(model) {
        caught = this.$el.find(".caught");
        caught.each(function(e) {
          if($(this).data("model").name==model.attributes.name) {
            $(this).removeClass("caught");
          }
        })
      },
      initialize: function () {
        var thisView = this;
        if(typeof this.collection != "undefined") {
          search = new Search({
            model:pokemons
          })
          _.each(this.collection.models, function (pokemon) {
            // Call the renderPostView method
            thisView.renderPokemonRowView(pokemon);
          });
        }
      }
    });
    return PokemonsTableView;
  }
);
