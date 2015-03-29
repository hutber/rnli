/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	$body: $('body'),
	bodyClass:function(desiredClass, oldClass){
		this.$body[0].classList.remove(oldClass);
		this.$body[0].classList.add(desiredClass);
	}
}