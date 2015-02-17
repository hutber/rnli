/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	views: require('./functions/viewSetup')(),
	url: require('./functions/urls'),
	titlebar: require('./functions/titlebar'),
	events: require('./functions/events'),
	login: require('./functions/login'),
	connection: require('./functions/connection'),
	popups: require('./functions/popups')()
}