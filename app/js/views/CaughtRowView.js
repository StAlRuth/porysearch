////////////////////////////////////////
// views/CaughtRowView.js
//
// Renders a single pokemon in a table row.
////////////////////////////////////////

define(['backbone',
  'jquery',
  'text!templates/pokemonRow.html'
  ],
  function(Backbone, $, pokemonRow) {
  CaughtRowView = Backbone.View.extend({
    className: "caught-row caught",
    tagName: "tr",
    events: {
      "click .catch":"catchPokemon"
    },
    catchPokemon: function() {
      //TODO: refactor
      if(!this.$el.hasClass("caught")) {
        caughtPokemons.addPokemon(this.model);
        this.$el.addClass("caught");
      } else {
        caughtPokemons.removePokemon(this.model);
        this.$el.remove();
      }
      contentView = new ContentView();
      contentView.updateCounters();
    },
    template: _.template(pokemonRow),
    render: function(){
      this.$el.attr("data-model",JSON.stringify(this.model.toJSON()))
          .attr("data-name",this.model.attributes.name)
          .attr("id",'caughtPokemon-' + this.model.attributes.identifier.toLowerCase())
          .append(this.template(_.extend(this.model.toJSON()
          )));
    },
  });
  return CaughtRowView;
});
