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
			url: 'signup',
			title: 'My Login Details'
		},
		{
			name: 'home',
			path: require('../views/homeView'),
			url: 'home',
			title: 'Landing Page'
		}

		/*==================================================
		 Users
		 ================================================== */

		/*==================================================
		 Trips
		 ================================================== */
		,{
			name: 'tripsHome',
			path: require('../views/trips/tripsHomeView'),
			url: 'trips',
			title: 'My Trips'
		}
		,{
			name: 'tripsCreateView',
			path: require('../views/trips/tripsCreateView'),
			url: 'createtrip',
			title: 'Create New Trip'
		}
		,{
			name: 'tripsCurrentTripView',
			path: require('../views/trips/tripsCurrentTripView'),
			url: 'currenttrip',
			title: 'CURRENT TRIP'
		}
	);
	return currentViews;
}