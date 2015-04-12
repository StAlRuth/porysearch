////////////////////////////////////////
// app.js
//
// Creates an object that initialises
// the router.
//
////////////////////////////////////////

define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  ],
  function($, _, Backbone, Router) {
    var initialize = function() {
      Router.initialize();
    };
    return { 
      initialize: initialize
    };
  }
);
