////////////////////////////////////////
// views/DocumentView.js
//
// Resizes elements to fit the screen
////////////////////////////////////////

define([
  'backbone',
  'jquery'
  ],
  function(Backbone) {
    DocumentView = Backbone.View.extend({
      el:$(document),
      resizeElements: function() {
        // >640 means the foundation "Medium" screen size
        // so on screens that are medium and larger, the search button
        // will not show
        if($(window).width()>1024) {
          $(".main-content").height($(window).height() -
          $("header").outerHeight());
        } else {
          $(".main-content").height($(window).height() - 
            $("header").outerHeight() - $(".back").outerHeight());
        }
        $(".leftWrap").height($(window).height() - $("header").height());
        $(".leftWrap .tabs-content").height($(".leftWrap").outerHeight() -
          $(".tabs").outerHeight() - $(".searchWrap").outerHeight());
      },
      initialize: function() {
        this.resizeElements();
      }
    });
    return DocumentView;
  }
);
