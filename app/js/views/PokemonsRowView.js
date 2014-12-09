define([
  'backbone',
  'jquery',
  'collections/CaughtPokemons',
  'views/ContentView',
  'text!templates/pokemonRow.html', 
  'views/CaughtTableView'
  ],
  function(Backbone,$,CaughtPokemons, ContentView, pokemonRow) {
  PokemonRowView = Backbone.View.extend({
    events: {
      "click .catch":"catchPokemon"
    },
    className: "pokemon-row",
    tagName: "tr",
    catchPokemon: function() {
      if(!this.$el.hasClass("caught")) {
        caughtPokemons.addPokemon(this.model);
        this.$el.addClass("caught");
      } else {
        caughtPokemons.removePokemon(this.model);
        this.$el.removeClass("caught");
        document.getElementById("caughtPokemon-" + this.model.attributes.identifier).remove();
      }
      contentView = new ContentView;
      contentView.updateCounters();
    },
    template: _.template(pokemonRow),
    render: function () {
      caughtPokemons = new CaughtPokemons;
      caughtPokemons.fetch();
      if(caughtPokemons.where({name:this.model.attributes.name}).length==1) {
        this.$el.addClass("caught");
      }
        this.$el.attr("data-model",JSON.stringify(this.model.toJSON()))
            .attr("data-name",this.model.attributes.name)
            .append(this.template(_.extend(this.model.toJSON())));
      }
  });
  return PokemonRowView;
});
