define([
  'backbone',
  'jquery'
  ],
  function(Backbone) {
    Search = Backbone.View.extend({
      el: $(".searchWrap"),
      events: {
        'keyup #search':'filters',
        'click #clear':'clear'
      },
      clear: function() {
        $("#search").val("");
        history.pushState("", document.title, window.location.pathname
            + window.location.search);
        this.filters();
      },
      filters: function() {
        value = $("#search").val();
        $pokemonrow = pokemonsTableView.$el.find(".pokemon-row");
        $moverow = movesTableView.$el.find(".move-row");
        $abilityrow = abilitiesTableView.$el.find(".ability-row");
        $caughtrow = caughtTableView.$el.find(".caught-row");
        var pokemonCount = 0,
        moveCount = 0,
        abilityCount = 0,
        typeCount = 0,
        caughtCount = 0;
        //results
        counters = {};
        if(value.indexOf("type:")>=0) {
          typevalue = value.substring(value.indexOf("type:")+5);
          reg = new RegExp(typevalue,"i");
          $pokemonrow.each(function(i) {
          model = $(this).data("model");
          match = 0;
          types = model.types;
          for(i=0;i<types.length;i++) {
            if(types[i].toLowerCase() == typevalue.toLowerCase()) {
              match++
            }     
          };
          if(match>0) {
            $(this).show();
            pokemonCount++
          } else {
            $(this).hide();
          }
        });

        $caughtrow.each(function(i) {
          model = $(this).data("model");
          match = 0;
          types = model.types;
          for(i=0;i<types.length;i++) {
            if(types[i].toLowerCase() == typevalue.toLowerCase()) {
              match++
            }     
          };
          if(match>0) {
          $(this).show();
            caughtCount++
          } else {
            $(this).hide();
          }
        });

        $moverow.each(function(i) {
          model = $(this).data("model");
          type = model.type;
          if(type.toLowerCase() == typevalue.toLowerCase()) {
            $(this).show();
            moveCount++;
          } else {
            $(this).hide();
          }
        });

        this.updateCounters([pokemonCount, moveCount, abilityCount, caughtCount]);
          return false;
        }

        $abilityrow.each(function(i) {
          var model = $(this).data("model");
          var reg = new RegExp(value,"gi");
          var name = model.name;
          if(!reg.test(name)) {
            $(this).hide()
          } else {
            $(this).show();
            abilityCount++;
          }
        })

        $moverow.each(function(i) {
            var model = $(this).data("model");
            var reg = new RegExp(value,"gi");
            var name = model.name;
          if(!reg.test(name)) {
            $(this).hide()
          } else {
            $(this).show();
            moveCount++;
          }
        })

        $pokemonrow.each(function(i) {
          var count = 0;
          var model = $(this).data("model");
          var number = model.number;
          var name = model.name;
          var moves = (typeof model.learnedMoves == "object") ? model.learnedMoves : "";
          var reg = new RegExp(value,"gi");
          var type = $(this).find(".typewrap").find(".type").text();
          // var learnedMoves = 0;
          movesArray = [];
          if (!reg.test(name) && number.toString().indexOf(value) != 0 && 
              parseInt(number)!=parseInt(value)) {
            $(this).hide();
          } else {
            $(this).show();
            pokemonCount++;
          }
        });

        $caughtrow.each(function(i) {
          var model = $(this).data("model");
          var number = model.number;
          var name = model.name;
          var moves = (typeof model.learnedMoves == "object") ? model.learnedMoves : "";
          var reg = new RegExp(value,"gi");
          var type = $(this).find(".typewrap").find(".type").text();
          movesArray = [];
          if (!reg.test(name) &&  number.toString().indexOf(value) != 0 && 
              parseInt(number)!=parseInt(value)) {
            $(this).hide();
          } else {
            $(this).show();
            caughtCount++;
          }
        });
        this.updateCounters([
          pokemonCount, moveCount, abilityCount, caughtCount
        ]);
      },
      updateCounters: function(counters) {
        $("#tab-pokemon .count").html(counters[0]);
        $("#tab-move .count").html(counters[1]);
        $("#tab-ability .count").html(counters[2]);
        $("#tab-caught .count").html(counters[3]);
      },
      initialize: function() {
      }
    })
  }
);
