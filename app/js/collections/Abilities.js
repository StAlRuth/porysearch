define([
  'underscore',
  'backbone',
  'models/Ability'
  ],
  function(_, Backbone, Ability) {
    Abilities = Backbone.Collection.extend({
      model: Ability,
    })
   return Abilities;
  }
);
