////////////////////////////////////////
// router.js
//
// Interprets the URL and displays the
// appropriate page.
//
// The backbone of the application.
////////////////////////////////////////

define([
  'jquery',
  'underscore',
  'backbone',
  'foundation',
  'localstorage',
  'views/PokemonsTableView',
  'views/MovesTableView',
  'views/AbilitiesTableView',
  'views/CaughtTableView',
  'views/DocumentView',
  'views/ContentView',
  'models/Pokemon',
  'models/Ability',
  'models/Move',
  'models/Machine',
  'collections/Pokemons',
  'collections/Abilities',
  'collections/Moves',
  'collections/CaughtPokemons',
  'collections/Machines',
  ],
  function($, _, Backbone, foundation, localstorage, PokemonsTableView,
  MovesTableView, AbilitiesTableView, CaughtTableView, DocumentView,
  ContentView, Pokemon, Ability, Move, Machine, Pokemons, Abilities, Moves,
  CaughtPokemons, Machines) {
    var AppRouter = Backbone.Router.extend({
      routes : {
        // Pokemon page
        "!pokemon/:name":"getPokemon",
        // Search results page
        // TODO: obsolete this
        "!q/:search":"getSearch",
        // fallback?
        ":page":"getPage",
        "":"getPage",
        // Move info page
        "!move/:move":"getMove",
        // fallback?
        "*actions":"defaultRoute"
      }
    });
    
    // Initialises the application
    var initialize = function() {
      var appRouter = new AppRouter();
      
      // load up the JSON files
      $.getJSON("data/move.json", function(json) {
        moves = new Moves(json);
        movesTableView = new MovesTableView({
          collection: moves
        });
      });

      $.getJSON("data/pokemon.json", function(json) {
        caughtPokemons = new CaughtPokemons();
        caughtPokemons.fetch();
        caughtTableView = new CaughtTableView({
          collection: caughtPokemons
        });
        pokemons = new Pokemons(json);
        pokemonsTableView = new PokemonsTableView({
          collection: pokemons
        });
      });

      $.getJSON("data/ability.json", function(json) {
        abilities = new Abilities(json);
        abilitiesTableView = new AbilitiesTableView({
          collection: abilities
        });
      });

      // TM/HM data
      $.getJSON("data/machine.json", function(json) {
        machines = new Machines(json);
      });

      // Once we've loaded all of the data
      $(document).ajaxStop(function() {
        // Hide the loading animation
        $("#loading").hide();
        // Create the various components of the page
        new DocumentView();
        new Search();
        // activate the search filters if we followed a '!q/*' link
        search.filters();
        contentView = new ContentView();
        contentView.updateCounters();
        // AppRouter events!
        appRouter.on('route:getPokemon', function(pokemon) {
          // replace underscores with
          pokemon = pokemon.replace(/_/gi," ");
          contentView.showPokemon({model:pokemons.where({name:pokemon})});
        });
        
        appRouter.on('route:getSearch', function(search) {
          $("#search").val(search);
          search = new Search();
          search.filters();
        });

        appRouter.on('route:getMove', function(move) {
          move = move.replace(/_/gi,"");
          contentView.showMove({model:moves.where({name:move})});
        });
        
        // wat is this i dont even
        appRouter.on('route:getPage', function(page) {
          page = (typeof page == "undefined") ? "" : page;
          contentView.showPage(page);
        });

        appRouter.on('route:getAbility', function(move) {
          ability = ability.replace(/_/gi,"");
          contentView.showability({model:abilities.where({name:ability})});
        });

        Backbone.history.start();
        
        // onClick for the search button that displays in mobile mode
        $(".back").on('click',function() {
          appRouter.navigate("", {trigger : true});
          $(".contentWrap").css({
            right:"-100%"
          });
        });

        // onClick for intra-app links
        $(this).on('click', 'a:not([data-bypass])', function (evt) {
          var href = $(this).attr('href');
          var protocol = this.protocol + '//';
          passThrough = href.indexOf('sign_out') >= 0;
          if (!passThrough && !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey) {
            evt.preventDefault();
          }
          if(href =="#") {
            evt.preventDefault();
          } else {
            if (!href.match(/#panel/) && !href.match(/#movelist/)&& !href.match(/#learnlist/) && href.slice(protocol.length) !== protocol) {
              appRouter.navigate(href, {trigger : true});
            }
          }
        });
        
        // recreate the view on resize to account for the new screen size.
        $(window).on('resize',function() {
          new DocumentView();
        });
      }).foundation().ready(function() {
        // TODO: set to true at some point
        window.prerenderReady = false;
      });
    };
      return { 
      initialize: initialize
    };
  }
);
