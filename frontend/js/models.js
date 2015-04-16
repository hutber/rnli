/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	user: require('./models/user')(),
	currentTrip: require('./models/currentTrip')(),
	trips: require('./models/trips')(),
	weather: require('./models/weather')(),
	previousTrip: require('./models/previousTrip')(),
}