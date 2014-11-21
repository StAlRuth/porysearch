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
    // console.log(Abilities);
    var AppRouter = Backbone.Router.extend({
      routes : {
        "!pokemon/:name":"getPokemon",
        "!q/:search":"getSearch",
        ":page":"getPage",
        "":"getPage",
        "!move/:move":"getMove",
        "*actions":"defaultRoute"
      }
    })
    var initialize = function() {
      var appRouter = new AppRouter;
      $.getJSON("data/move.json", function(json) {
        moves = new Moves(json);
        movesTableView = new MovesTableView({
          collection: moves
        });
      });

      $.getJSON("data/pokemon.json", function(json) {
        caughtPokemons = new CaughtPokemons;
        caughtPokemons.fetch();
        caughtTableView = new CaughtTableView({
          collection: caughtPokemons
        })
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

      $.getJSON("data/machine.json", function(json) {
        machines = new Machines(json);
      });

      $(document).ajaxStop(function() {
        $("#loading").hide();
        new DocumentView;
        new Search;
        search.filters();
        contentView = new ContentView;
        contentView.updateCounters();
        appRouter.on('route:getPokemon', function(pokemon) {
          // replace underscores with
          pokemon = pokemon.replace(/_/gi," ");
          contentView.showPokemon({model:pokemons.where({name:pokemon})});
        });
        
        appRouter.on('route:getSearch', function(search) {
          $("#search").val(search);
          var search = new Search;
          search.filters();
        })

        appRouter.on('route:getMove', function(move) {
          move = move.replace(/_/gi,"");
          contentView.showMove({model:moves.where({name:move})})
        })
        appRouter.on('route:getPage', function(page) {
          page = (typeof page == "undefined") ? "" : page;
          contentView.showPage(page);
        })

        appRouter.on('route:getAbility', function(move) {
          ability = ability.replace(/_/gi,"");
          contentView.showability({model:abilities.where({name:ability})})
        })

        Backbone.history.start();
        $(".back").on('click',function() {
          console.log('tete')
          appRouter.navigate("", {trigger : true});
          $(".contentWrap").css({
            right:"-100%"
          })
        })

        $(this).on('click', 'a:not([data-bypass])', function (evt) {
          var href = $(this).attr('href');
          var protocol = this.protocol + '//';
          passThrough = href.indexOf('sign_out') >= 0;
          if (!passThrough && !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey) {
            evt.preventDefault();
          }
          if(href =="#") {
            evt.preventDefault();
            console.log(href);
          } else {
            if (!href.match(/#panel/) && !href.match(/#movelist/) && href.slice(protocol.length) !== protocol) {
              appRouter.navigate(href, {trigger : true});
            }
          }
        })
        $(window).on('resize',function() {
          new DocumentView
        })
      }).foundation().ready(function() {
        window.prerenderReady = false;
      });
    }

      return { 
      initialize: initialize
    };
  }
)
