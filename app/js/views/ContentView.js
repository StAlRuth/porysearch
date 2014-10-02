define([
  'backbone',
  'jquery',
  'text!templates/welcome.html',
  'text!templates/moveContent.html', 
  'text!templates/pokemonContent.html', 
  'collections/CaughtPokemons'
  ], 
  function(Backbone, $, welcome, moveContent, pokemonContent, CaughtPokemons) {
  ContentView = Backbone.View.extend({
    el:$(".main-content"),
    events: {
      "click .caught-button":"addToCaught"
    },
    updateCounters: function() {
      caughtPokemons = new CaughtPokemons;
      caughtPokemons.fetch();
      $("#tab-caught .count").html(caughtPokemons.length);
    },
    showPage: function(page) {
      page = (page == "") ? "welcome" : page;
      template =_.template(welcome),
      this.$el.html(template);
      new DocumentView;
    },
    showPokemon: function(pokemon) {
      template = _.template(pokemonContent);
      model = (pokemon.model[0]) ? pokemon.model[0] : pokemon.model;
      attr = model.attributes;
      currentModel = model.toJSON();
      this.$el.attr("data-model",JSON.stringify(model.toJSON()))
          .html(template(_.extend(model.toJSON())));
      if($(window).width() < 1000) {
        console.log('s');
        $(".contentWrap").css({
          right: "0%"
        });
      }
    },
    addToCaught: function(evt) {
      // console.log("we");
      pokemon = currentModel;
      console.log(pokemon);
      caughtPokemons.addPokemon(pokemon);
    },
    showMove: function(move) {
      template = _.template(moveContent);
      model = (move.model[0]) ? move.model[0] : move.model;
      attr = model.attributes;
      this.$el.html(template(_.extend(model.toJSON())));
      if($(window).width() < 1000) {
        console.log('s');
        $(".contentWrap").css({
          right: "0%"
        });
        new DocumentView;
      }
    }
    })
    return ContentView;
  }
);
