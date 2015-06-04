////////////////////////////////////////
// event.js
//
// Defines global event handlers, such
// as:
//
// the appCache's updateReady event.
////////////////////////////////////////

define([
  'jquery',
  'foundation'
  ],
  function($, foundation)
  {
    return function() {
      window.applicationCache.addEventListener('updateready', function(e) {
        // If an update is ready...
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
          $('#appCacheModal').foundation('reveal', 'open');
        }
      }, false);
    };
  }
);
