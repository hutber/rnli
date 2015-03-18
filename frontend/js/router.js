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
		'profile': 'profile',

		// #Safety ---------------------------------------------------- /
		'safety':'safety',
		'safetybrowse':'safetybrowse',

		// #Home ---------------------------------------------------- /
		'trips': 'trips',
		'createtrip': 'createtrip',
		'currenttrip': 'currenttrip',

		// #Weather Centre ---------------------------------------------------- /
		'weather': 'weather',

		// #Catch ---------------------------------------------------- /
		'catch': 'catch',

		// #About ---------------------------------------------------- /
		'abouthome': 'abouthome',
		'about': 'about',
		'donate': 'donate',
		'contact': 'contact',
		'conservation': 'conservation',
		'legal': 'legal',
		'rate': 'rate',
		'share': 'share',
		'terms': 'terms',
		'privacy': 'privacy',
	}
});
//Set up Routes for backbone.
RN.router = new Router();