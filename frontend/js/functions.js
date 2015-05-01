/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	url: require('./functions/urls'),
	titlebar: require('./functions/titlebar'),
	events: require('./functions/events'),
	login: require('./functions/login'),
	connection: require('./functions/connection'),
	location: require('./functions/location'),
	json: require('./functions/json'),
	heights: require('./functions/heights'),
	user: {
		contacts: require('./functions/user/contacts')()
	},
	popups: require('./functions/popups')(),
	catch: require('./functions/catch')(),
	notes: require('./functions/notes')(),
	suncal: require('./functions/suncal')(),
	camera: require('./functions/camera')(),
	stars: require('./functions/stars')(),
	heightweight: require('./functions/heightweight')(),
	notices: require('./functions/notices')()
}