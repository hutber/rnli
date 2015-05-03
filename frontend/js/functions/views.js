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
		}
		,{
			name: 'signup',
			path: require('../views/users/signupView'),
			url: 'signup',
			title: 'My Login Details'
		}
		,{
			name: 'homeView',
			path: require('../views/homeView'),
			url: 'home',
			title: 'Landing Page'
		}

		/*==================================================
		 Users
		 ================================================== */
		,{
			name: 'profileView',
			path: require('../views/users/profileView'),
			url: 'profile',
			title: 'My Profile'
		}
		,{
			name: 'forgottenView',
			path: require('../views/users/forgottenView'),
			url: 'forgotten',
			title: 'FORGOTTEN DETAILS'
		}
		/*==================================================
		 Safety Tips
		 ================================================== */
		,{
			name: 'safetyBrowseView',
			path: require('../views/safety/safetyBrowseView'),
			url: 'safetybrowse',
			title: 'Safety Tips'
		}
		,{
			name: 'safetyView',
			path: require('../views/safety/safetyView'),
			url: 'safety',
			title: 'Safety Tips'
		}
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
		,{
			name: 'tripclosedView',
			path: require('../views/trips/tripsClosedView'),
			url: 'tripclosed',
			title: 'TRIP CLOSED'
		}
		,{
			name: 'addHazardView',
			path: require('../views/trips/hazard/addHazardView'),
			url: 'addhazard',
			title: 'ADD HAZARD'
		}
		,{
			name: 'notesView',
			path: require('../views/trips/notes/notesView'),
			url: 'notes',
			title: 'ADD NOTES'
		}
		,{
			name: 'addNotesView',
			path: require('../views/trips/notes/addNotesView'),
			url: 'addnotes',
			title: 'ADD NOTE'
		}
		/*==================================================
		 Previous Trips
		 ================================================== */
		,{
			name: 'tripsPrevious',
			path: require('../views/trips/previous/tripsPreviousView'),
			url: 'tripsprevious',
			title: 'A PREVIOUS TRIP'
		}
		,{
			name: 'tripsPreviousHazard',
			path: require('../views/trips/previous/tripsPreviousHazardView'),
			url: 'tripsprevioushazard',
			title: 'PREVIOUS HAZARD'
		}
		,{
			name: 'tripsPreviousNote',
			path: require('../views/trips/previous/tripsPreviousNoteView'),
			url: 'tripspreviousnote',
			title: 'PREVIOUS NOTES'
		}
		,{
			name: 'tripsPreviousAddNote',
			path: require('../views/trips/previous/tripsPreviousAddNoteView'),
			url: 'trippreviousaddnotes',
			title: 'PREVIOUS ADD NOTES'
		}
		,{
			name: 'tripsPreviousCatch',
			path: require('../views/trips/previous/catch/tripsPreviousCatchView'),
			url: 'trippreviouscatch',
			title: 'PREVIOUS CATCH VIEW'
		}
		,{
			name: 'tripsPreviousCatchOverview',
			path: require('../views/trips/previous/catch/tripsPreviousCatchOverviewView'),
			url: 'trippreviouscatchoverview',
			title: 'PREVIOUS CATCH OVERVIEW'
		}
		,{
			name: 'trippreviousaddCatchView',
			path: require('../views/trips/previous/catch/previousAddCatchView'),
			url: 'trippreviousaddcatch',
			title: 'ADD NEW PREVIOUS CATCH'
		}
		,{
			name: 'trippreviousconfirmCatchView',
			path: require('../views/trips/previous/catch/previousConfirmCatchView'),
			url: 'trippreviousconfirmcatch',
			title: 'CONFIRM PREVIOUS CATCH'
		}
		/*==================================================
		 Weather Center
		 ================================================== */
		,{
			name: 'weatherCentreView',
			path: require('../views/weather/weatherCentreView'),
			url: 'weather',
			title: 'WEATHER CENTRE'
		}
		/*==================================================
		 Catch Log
		 ================================================== */
		,{
			name: 'previousCatchView',
			path: require('../views/catch/previousCatchView'),
			url: 'previouscatch',
			title: 'TOTAL CATCH LOG'
		}
		,{
			name: 'individualCatchView',
			path: require('../views/catch/individualCatchView'),
			url: 'individualcatch',
			title: 'A CATCH'
		}
		,{
			name: 'catchView',
			path: require('../views/trips/catch/catchView'),
			url: 'tripcatch',
			title: 'TRIP CATCH LOG'
		}
		,{
			name: 'addCatchView',
			path: require('../views/trips/catch/addCatchView'),
			url: 'addcatch',
			title: 'ADD NEW CATCH'
		}
		,{
			name: 'confirmCatchView',
			path: require('../views/trips/catch/confirmCatchView'),
			url: 'confirmcatch',
			title: 'CONFIRM CATCH'
		}
		/*==================================================
		 About
		 ================================================== */
		,{
			name: 'abouthomeView',
			path: require('../views/about/abouthomeView'),
			url: 'abouthome',
			title: 'ABOUT'
		}
		,{
			name: 'aboutView',
			path: require('../views/about/aboutView'),
			url: 'about',
			title: 'ABOUT'
		}
		,{
			name: 'legalView',
			path: require('../views/about/legalView'),
			url: 'legal',
			title: 'LEGAL DISCLAIMER'
		}
		,{
			name: 'donateView',
			path: require('../views/about/donateView'),
			url: 'donate',
			title: 'Donate'
		}
		,{
			name: 'contactView',
			path: require('../views/about/contactView'),
			url: 'contacts',
			title: 'Contact RNLI'
		}
		,{
			name: 'rateView',
			path: require('../views/about/rateView'),
			url: 'rate',
			title: 'Rate this App'
		}
		,{
			name: 'shareView',
			path: require('../views/about/shareView'),
			url: 'share',
			title: 'Share this app'
		}
		,{
			name: 'termsView',
			path: require('../views/about/termsView'),
			url: 'terms',
			title: 'Terms of Service'
		}
		,{
			name: 'privacyView',
			path: require('../views/about/privacyView'),
			url: 'privacy',
			title: 'Privacy policy'
		}
	);
	return currentViews;
}