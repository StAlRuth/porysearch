define([
  'backbone',
  'jquery'
  ],
  function(Backbone) {
    DocumentView = Backbone.View.extend({
      el:$(document),
      resizeElements: function() {
        if($(window).width()>640) {
          $(".main-content").height($(window).height()
            - $("header").outerHeight());
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
    })
    return DocumentView;
  }
);
