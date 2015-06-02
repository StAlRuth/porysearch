////////////////////////////////////////
// views/ContentView.js
//
// Manages the area in which the Info
// pages are displayed.
////////////////////////////////////////

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
        caughtPokemons = new CaughtPokemons();
        caughtPokemons.fetch();
        $("#tab-caught .count").html(caughtPokemons.length);
      },
      showPage: function(page) {
        // IDEK what the page var does
        page = (page === "") ? "welcome" : page;
        template =_.template(welcome);
        this.$el.html(template);
        new DocumentView();
      },
      showPokemon: function(pokemon) {
        template = _.template(pokemonContent);
        model = (pokemon.model[0]) ? pokemon.model[0] : pokemon.model;
        attr = model.attributes;
        currentModel = model.toJSON();
        this.$el.attr("data-model",JSON.stringify(model.toJSON()))
            .html(template(_.extend(model.toJSON())));
        // Corresponds with upper bound for medium screen
        // therefore this screen will not show on medium displays
        if($(window).width() <= 1024) {
          $(".contentWrap").css({
            right: "0%"
          });
        }
      },
      // TODO: Does this function actually do anything?
      addToCaught: function(evt) {
        pokemon = currentModel;
        caughtPokemons.addPokemon(pokemon);
      },
      showMove: function(move) {
        template = _.template(moveContent);
        model = (move.model[0]) ? move.model[0] : move.model;
        attr = model.attributes;
        this.$el.html(template(_.extend(model.toJSON())));
        // Corresponds with upper bound for medium screen
        // therefore this screen will not show on medium displays
        if($(window).width() <= 1024) {
          $(".contentWrap").css({
            right: "0%"
          });
          new DocumentView();
        }
      }
    });
  return ContentView;
  }
);
