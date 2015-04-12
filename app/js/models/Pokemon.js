////////////////////////////////////////
// models/Pokemon.js
//
// Describes a Pokemon and defines
// some helper methods
////////////////////////////////////////

define([
  'underscore',
  'backbone'
  ],
  function(_, Backbone) {
  var typelist = new Array("Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy");
    Pokemon = Backbone.Model.extend({
      defaults: {
        evo :'',
        pre_evo:'',
        learnedMoves: '',
        abilities: '',
        caught: '0'
      },
      getStat:function(type,stat) {
        switch(type) {
          // TODO: define as arrays directly
          case "Normal": 
            w = "1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1";
            e = "1,1,1,1,1,1,1,1,1,1,1,1,.5,0,1,1,.5,1";
            break;
          case "Fire": 
            w = "1,.5,2,1,.5,.5,1,1,2,1,1,.5,2,1,1,1,.5,.5";
            e = "1,.5,.5,1,2,2,1,1,1,1,1,2,.5,1,.5,1,2,1";
            break;
          case "Water":
            w = "1,.5,.5,2,2,.5,1,1,1,1,1,1,1,1,1,1,.5,1";
            e = "1,2,.5,1,.5,1,1,1,2,1,1,1,2,1,.5,1,1,1";
            break;
          case "Electric":
            w = "1,1,1,.5,1,1,1,1,2,.5,1,1,1,1,1,1,.5,1";
            e = "1,1,2,.5,.5,1,1,1,0,2,1,1,1,1,.5,1,1,1";
            break;
          case "Grass":
            w = "1,2,.5,.5,.5,2,1,2,.5,2,1,2,1,1,1,1,1,1";
            e = "1,.5,2,1,.5,1,1,.5,2,.5,1,.5,2,1,.5,1,.5,1";
            break;
          case "Ice":
            w = "1,2,1,1,1,.5,2,1,1,1,1,1,2,1,1,1,2,1";
            e = "1,.5,.5,1,2,.5,1,1,2,2,1,1,1,1,2,1,.5,1";
            break;
          case "Fighting":
            w = "1,1,1,1,1,1,1,1,1,2,2,.5,.5,1,1,.5,1,2";
            e = "2,1,1,1,1,2,1,.5,1,.5,.5,.5,2,0,1,2,2,.5";
            break;
          case "Poison":
            w = "1,1,1,1,.5,1,.5,.5,2,1,2,.5,1,1,1,1,1,.5";
            e = "1,1,1,1,2,1,1,.5,.5,1,1,1,.5,.5,1,1,0,2";
            break;
          case "Ground":
            w = "1,1,2,0,2,2,1,.5,1,1,1,1,.5,1,1,1,1,1";
            e = "1,2,1,2,.5,1,1,2,1,0,1,.5,2,1,1,1,2,1";
            break;
          case "Flying":
            w = "1,1,1,2,.5,2,.5,1,0,1,1,.5,2,1,1,1,1,1";
            e = "1,1,1,.5,2,1,2,1,1,1,1,2,.5,1,1,1,.5,1";
            break;
          case "Psychic":
            w = "1,1,1,1,1,1,.5,1,1,1,.5,2,1,2,1,2,1,1";
            e = "1,1,1,1,1,1,2,2,1,1,.5,1,1,1,1,0,.5,1";
            break;
          case "Bug":
            w = "1,2,1,1,.5,1,.5,1,.5,2,1,1,2,1,1,1,1,1";
            e = "1,.5,1,1,2,1,.5,.5,1,.5,2,1,1,.5,1,2,.5,.5";
            break;
          case "Rock":
            w = ".5,.5,2,1,2,1,2,.5,2,.5,1,1,1,1,1,1,2,1";
            e = "1,2,1,1,1,2,.5,1,.5,2,1,2,1,1,1,1,.5,1";
            break;
          case "Ghost":
            w = "0,1,1,1,1,1,0,.5,1,1,1,.5,1,2,1,2,1,1";
            e = "0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,.5,1,1";
            break;
          case "Dragon":
            w = "0,.5,.5,.5,.5,2,1,1,1,1,1,1,1,1,2,1,1,2";
            e = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,.5,0";
            break;
          case "Dark":
            w = "1,1,1,1,1,1,2,1,1,1,0,2,1,.5,.1,.5,1,2";
            e = "1,1,1,1,1,1,.5,1,1,1,2,1,1,2,1,.5,1,.5";
            break;
          case "Steel":
            w = ".5,2,1,1,.5,.5,2,0,2,.5,.5,.5,.5,1,.5,1,.5,.5";
            e = "1,.5,.5,.5,1,2,1,1,1,1,1,1,2,1,1,1,.5,2";
            break;
          case "Fairy":
            w = "1,1,1,1,1,1,.5,2,1,1,1,.5,1,1,0,.5,2,1";
            e = "1,.5,1,1,1,1,2,.5,1,1,1,1,1,1,2,2,.5,1";
            break;
          default :
            w = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
            e = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
            break;
        }
        w = w.split(",");
        e = e.split(",");
        if(stat=="weakness") {
          return w;
        } else {
          return e;
        }
      },
      calculateStat: function(x) {
        model = this;
        types = model.attributes.types;
        //define arrays for $.type(DOMelementArray);s
        var x4weak = [],
            x2weak = [],
            normal = [],
            x2strong = [],
            x4strong = [],
            nodmg = [];
        //if only one element
        stat1 = model.getStat(types[0],x);
        //if two.
        if(types.length==2) {
          stat2 =  model.getStat(types[1],x);
        }
        for(i=0;i<typelist.length;i++) {
          //Normal
          if(types.length==1) {
            stat = Number(stat1[i]);
          } else {
            if (x == "weakness") {
              stat = stat1[i] * stat2[i];
            } else {
              stat = Math.max(Number(stat1[i]), Number(stat2[i]));
            }
          }
          switch(stat) {
            case 1:
              normal.push(typelist[i]);
              break;
            case 2:
              x2weak.push(typelist[i]);
              break;
            case 4:
              x4weak.push(typelist[i]);
              break;
            case 0.5:
              x2strong.push(typelist[i]);
              break;
            case 0.25:
              x4strong.push(typelist[i]);
              break;
            case 0:
              nodmg.push(typelist[i]);
              break;
          }
        }

        if(x=="weakness") {
          this.set({weakness: {
            x4weak : x4weak,
            x2weak : x2weak,
            normal : normal,
            x2strong : x2strong,
            x4strong : x4strong,
            nodmg : nodmg
          }});
        } else {
          this.set({strength: {
            x4weak : x4strong,
            x2weak : x2strong,
            normal : normal,
            x2strong : x2weak,
            x4strong : x4weak,
            nodmg : nodmg
          }});
        }
      },
      setstats: function() {
        if(typeof this.attributes["pre-evo"] != "undefined") {
          this.set({
            pre_evo : this.attributes["pre-evo"]
          });
        }
        this.calculateStat("weakness");
        this.calculateStat("strength");
      },
      setCaught: function(model) {},
      initialize: function() {
        this.setstats();
        //fix for dash in variable
      }
    });
    return Pokemon;
  }
);
