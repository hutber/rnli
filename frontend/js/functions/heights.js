/**
 * Created by Hutber on 04/03/2015.
 */
module.exports = {
	changeHeightofContent: function(){
		var body = document.body,
			html = document.documentElement,
			footerHeight = $('.footer').outerHeight(),
			headerHeight = $('.header').outerHeight(),
			height = $('body').outerHeight();

		if($('.footer').is(':visible') && !$('.header').is(':visible')){ //only footer showing
			RN.glb.pageHeight = height - footerHeight;
		}else if(!$('.footer').is(':visible') && $('.header').is(':visible')){ //only header showing
			RN.glb.pageHeight = height - headerHeight;
		}else if(!$('.footer').is(':visible') && !$('.header').is(':visible')){ //no footer no header
			RN.glb.pageHeight = height;
		}else {
			RN.glb.pageHeight = height - (headerHeight + footerHeight);
		}

		if(RN.glb.pageHeight > height) {
			$('.content, .shell').css({height: RN.glb.pageHeight});
		}
	}
}