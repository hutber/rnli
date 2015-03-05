/**
 * Created by Hutber on 04/03/2015.
 */
module.exports = {
	changeHeightofContent: function(){
		var body = document.body,
			html = document.documentElement;

		var height = Math.max( body.scrollHeight, body.offsetHeight,
					html.clientHeight, html.scrollHeight, html.offsetHeight );
		if($('.footer').is(':visible')){
			RN.glb.pageHeight = height - ($('.header').outerHeight() + $('.footer').outerHeight());
		}else{
			RN.glb.pageHeight = height - ($('.header').outerHeight());
		}
		$('.content').css({height:RN.glb.pageHeight});
	}
}