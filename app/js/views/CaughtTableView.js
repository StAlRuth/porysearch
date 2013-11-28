define(['backbone','jquery','views/CaughtRowView'], function(Backbone,$,CaughtRowView) {
	caughtRowView = new CaughtRowView;
	CaughtTableView = Backbone.View.extend({
		el: $(".caught-table"),
		renderView: function(model) {

			var caughtRowView = new CaughtRowView({
				model:model 
			});
			caughtRowView.render();
	        this.$el.children("tbody").append(caughtRowView.el);
		},
		addRow: function(model) {
			// console.log(model);
			// new CaughtPokemons.addPokemon(model);
			var caughtRowView = new CaughtRowView({
				model:model 
			});
	        caughtRowView.render();
	        this.$el.children("tbody").append(caughtRowView.el);
		},
		initialize: function() {
			var thisView = this;
			if(typeof this.collection != "undefined") {
		        _.each(this.collection.models, function (model) {
		        	// console.log(model);
		            // Call the renderPostView method
		            thisView.renderView(model);
		            // console.log(model);
		        });
		    }

		    if(typeof this.model != "undefined") {
		    	thisView.renderView(this.model)
		    }
		}
	})
	return CaughtTableView;
})