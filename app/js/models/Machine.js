define([
  'backbone',
  'localstorage'
  ],
  function(Backbone) {
    var Machine = Backbone.Model.extend({
      defaults: {},
      initialize: function() {}
    })
    return Machine;
  }
);
