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
		}else if(!$('.footer').is(':visible') && !$('.header').is(':visible')){
			RN.glb.pageHeight = height - 25;
		}else {
			RN.glb.pageHeight = height - ($('.header').outerHeight());
		}
		$('.content, .shell').css({height:RN.glb.pageHeight});
	}
}