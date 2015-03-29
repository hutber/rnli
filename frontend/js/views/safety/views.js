/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function (){
	'use strict';
	var currentViews = {};

	currentViews.home = {
			view: require('../../../views/safety/safety.jade')
		};

	currentViews.vests = {
		view: require('../../../views/safety/items/vests.jade')
	};

	return currentViews;
}