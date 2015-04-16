/**
 * Created by Hutber on 04/03/2015.
 */
module.exports = {
	changeHeightofContent: function(){
		var body = document.body,
			html = document.documentElement;

		var height = $('body').outerHeight();

		if($('.footer').is(':visible') && !$('.header').is(':visible')){ //only footer showing
			RN.glb.pageHeight = height - $('.footer').outerHeight();
		}else if(!$('.footer').is(':visible') && $('.header').is(':visible')){ //only header showing
			RN.glb.pageHeight = height - $('.header').outerHeight();
		}else if(!$('.footer').is(':visible') && !$('.header').is(':visible')){ //no footer no header
			RN.glb.pageHeight = height - 25;
		}else {
			RN.glb.pageHeight = height - ($('.header').outerHeight());
		}

		if(RN.glb.pageHeight > height) {
			$('.content, .shell').css({height: RN.glb.pageHeight});
		}
	}
}