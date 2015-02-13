/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = {
	$body: $('body'),
	bodyClass:function(desiredClass){
		this.$body[0].removeAttribute('class');
		this.$body[0].setAttribute('class',desiredClass);
	}
}