/**
 * Created by Hutber on 13/02/2015.
 */
module.exports = {
	onHashChange: function(){
		//make sure we are logged in, if we are not forward back to home page
		//TP.login.checkLoginState();

		//Updated previous hash
		RN.glb.PREVIOUSHASH = RN.glb.HASH;

		//Update the new hash
		RN.glb.HASH = window.location.hash.substring(1);
		if(RN.glb.HASH.length === 0) RN.glb.HASH = 'index';

		//On page load update body class with current page
		RN.fnc.url.bodyClass(RN.glb.HASH, RN.glb.PREVIOUSHASH);

		//Update Title
		RN.fnc.titlebar.title(RN.glb.title);
		//Resize the $('page') element
		//TP.changeHeightofContent();
	}
}