/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	$titlebar: $('.header'),
	$title: $('.header .middle h1'),
	$back: $('.header .left'),
	title:function(title){
		this.$title.html(title);
	},
	back: function(){
		this.$back.attr('href','#'+RN.glb.previoushash);
	}
}