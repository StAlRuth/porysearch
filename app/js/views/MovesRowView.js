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
        this.$el.attr("data-model", JSON.stringify(this.model.toJSON()))
            .append(this.template(_.extend(this.model.toJSON())));
      }
    });
  }
);
