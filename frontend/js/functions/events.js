/**
 * Created by Hutber on 13/02/2015.
 */
module.exports = {
	onHashChange: function(){
		//make sure we are logged in, if we are not forward back to home page
		//TP.login.checkLoginState();

		//Updated previous hash
		RN.PREVIOUSHASH = RN.HASH;

		//Update the new hash
		RN.HASH = window.location.hash.substring(1);

		//On page load update body class with current page
		//TP.DV.globalClass();

		//Resize the $('page') element
		//TP.changeHeightofContent();
	}
}