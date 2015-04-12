////////////////////////////////////////
// views/MovesRowView.js
//
// Renders a row of the moves table.
////////////////////////////////////////

define([
  'backbone',
  'jquery',
  'text!templates/moveRow.html'
  ],
  function(Backbone, $, moveRow) {
    MovesRowView = Backbone.View.extend({
      className:"move-row",
      tagName: "tr",
      template: _.template(moveRow),
      render: function() {
        //TODO: is setting the data-model attribute even necessary?
        this.$el.attr("data-model", JSON.stringify(this.model.toJSON()))
            .append(this.template(_.extend(this.model.toJSON())));
      }
    });
  }
);
