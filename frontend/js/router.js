/**
 * Created by Hutber on 10/02/2015.
 */


//routes from the home page
var Router = Backbone.Router.extend({
	routes: {
		// #Home ---------------------------------------------------- /
		'': 'index',
		'login': 'index',
		'home': 'home',

		//User Parts
		'signup': 'signup',

		// #Home ---------------------------------------------------- /
		'trips': 'trips',
		'createtrip': 'createtrip',
		'currenttrip': 'currenttrip',
	}
});
//Set up Routes for backbone.
RN.router = new Router();