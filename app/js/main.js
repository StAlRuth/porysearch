////////////////////////////////////////
// REQUIREJS CONFIGURATION
////////////////////////////////////////

requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'vendor/jquery/dist/jquery',
    backbone: 'vendor/backbone-amd/backbone',
    underscore: 'vendor/underscore-amd/underscore',
    foundation: 'vendor/foundation/js/foundation',  
    text : 'vendor/requirejs-text/text',
    router: 'router',
    localstorage: 'backbone.localStorage-min',
    app : 'app',
    event: 'event'
  },
  'localStorage': {
    deps: ['backbone'],
    exports: 'Backbone'
  }
});


////////////////////////////////////////
// main.js
//
// Fires up the application.
////////////////////////////////////////
require([
  'app',
  'event'
  ],
  function(App, Event) {
    // Create event handlers
    Event();
    // Initialise the application
    App.initialize();
  }
);
