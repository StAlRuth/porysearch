define([
  'backbone',
  'jquery',
  'text!templates/abilityRow.html'
  ],
  function(Backbone, $, abilityRow) {
  AbilityRowView = Backbone.View.extend({
    className:"ability-row",
    tagName: "tr",
    template: _.template(abilityRow),
    render: function() {
      this.$el.attr("data-model", JSON.stringify(this.model.toJSON()))
          .append(this.template(_.extend(
            this.model.toJSON()
          )));
    }
  })
});
