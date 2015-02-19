/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	user: require('./models/user')(),
	trip: require('./models/trip')(),
	location: require('./models/location')(),
}