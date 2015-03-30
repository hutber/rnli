/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function (){
	'use strict';
	var currentViews = {};

	currentViews.home = {
			view: require('../../../views/safety/safety.jade')
		};

	//# Shore -------------------------------------------------/
	currentViews.shore = [
		require('../../../views/safety/shore/amateur.jade'),
		require('../../../views/safety/shore/heavy.jade'),
		require('../../../views/safety/shore/carry.jade'),
	];

	//# Boats -------------------------------------------------/
	currentViews.boat = [
		require('../../../views/safety/boat/amateur.jade'),
		require('../../../views/safety/boat/carry.jade'),
		require('../../../views/safety/boat/check.jade'),
	];

	//# Kayak -------------------------------------------------/
	currentViews.kayak = [
		require('../../../views/safety/kayak/always.jade'),
		require('../../../views/safety/kayak/carry.jade'),
		require('../../../views/safety/kayak/check.jade'),
	];

	return currentViews;
}