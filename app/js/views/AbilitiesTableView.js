define([
  'backbone',
  'jquery',
  'views/Search',
  'models/Ability',
  'collections/Abilities',
  'views/AbilityRowView'
  ],
  function(Backbone) {
  AbilitiesTableView = Backbone.View.extend({
    el: $(".ability-table"),
    renderAbilityView: function(ability) {
      abilityRowView = new AbilityRowView({
        model:ability
      })
      this.$el.children("tbody").append(abilityRowView.el);
      abilityRowView.render();
    },
    initialize: function() {
      thisView = this;
      _.each(this.collection.models, function (move) {
        // Call the renderPostView method
        thisView.renderAbilityView(move);
      });
    }
  })
  return AbilitiesTableView;
});
