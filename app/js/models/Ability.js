////////////////////////////////////////
// models/Ability.js
//
// Describes an ability
////////////////////////////////////////

define([
  'backbone',
  'localstorage'
  ],
  function(Backbone) {
    var Ability = Backbone.Model.extend({
      defaults: {},
      initialize: function() {}
    });
    return Ability;
  }
);
