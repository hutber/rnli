/**
 * Created by Hutber on 10/02/2015.
 */


//routes from the home page
var Router = Backbone.Router.extend({
	routes: {
		// #Home ---------------------------------------------------- /
		'': 'index',

		//User Parts
		'signup': 'signup',

	}
});
//Set up Routes for backbone.
RN.router = new Router();