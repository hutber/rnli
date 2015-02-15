/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	$titlebar: $('.header'),
	$title: $('.middle h1'),
	title:function(title){
		this.$title.html(title);
	}
}