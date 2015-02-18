/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function (){
	'use strict';
	var currentViews = [];

	currentViews.push(

		/*==================================================
		 Home
		 ================================================== */
		{
			name: 'index',
			path: require('../views/indexView'),
			url: 'index'
		},
		{
			name: 'signup',
			path: require('../views/users/signupView'),
			url: 'signup'
		},
		{
			name: 'home',
			path: require('../views/homeView'),
			url: 'home'
		}

		/*==================================================
		 Users
		 ================================================== */
	);
	return currentViews;
}