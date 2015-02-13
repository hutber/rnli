/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function (){
	'use strict';
	var currentViews = [];

	currentViews.push(
		{
			name: 'index',
			path: require('../views/indexView'),
			url: 'index'
		},
		{
			name: 'signup',
			path: require('../views/signupView'),
			url: 'signup'
		}
	);
	return currentViews;
}