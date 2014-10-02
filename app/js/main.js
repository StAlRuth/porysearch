requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'vendor/jquery/jquery',
    backbone: 'vendor/backbone-amd/backbone',
    underscore: 'vendor/underscore-amd/underscore',
    foundation: 'vendor/foundation/js/foundation',  
    text : 'vendor/requirejs-text/text',
    router: 'router',
    localstorage: 'backbone.localStorage-min',
    app : 'app'
  },
  'localStorage': {
    deps: ['backbone'],
    exports: 'Backbone'
  }
})

require(['app'], function(App) {
  App.initialize();
})
