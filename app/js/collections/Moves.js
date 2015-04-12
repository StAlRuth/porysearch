////////////////////////////////////////
// collections/Moves.js
//
// Defines the list of Moves
////////////////////////////////////////

define([
  'underscore',
  'backbone',
  'models/Move'
  ],
  function(_, Backbone, Move) {
    Moves = Backbone.Collection.extend({
      model: Move,
    });
    return Moves;
  }
);
