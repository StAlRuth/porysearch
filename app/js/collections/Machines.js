////////////////////////////////////////
// collections/Machines.js
//
// Defines the list of TMs and HMs
////////////////////////////////////////

define([
  'underscore',
  'backbone',
  'models/Machine'
  ],
  function(_, Backbone, Machine) {
    Machines = Backbone.Collection.extend({
      model: Machine,
    });
    return Machines;
  }
);
