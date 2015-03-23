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
	notes: require('./functions/notes')()
}