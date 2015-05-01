'user strict';
var typeahead = require('typeahead.js/dist/typeahead.jquery');
//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	initialize: function(){
		var self = this;
		this.listenTo(self, 'change:image', this.render);
	},

	image: null,

	templates: {
		home: require('../../../../views/trips/catch/addcatch.jade'),
	},

	events: {
		'click .addcatchphoto': 'addCatchPhoto',
		'click .switch input': 'changeWeights',
		'keyup #species': 'checkReady',
	},

	changeWeights : function(ev){
		var ev = $(ev.currentTarget),
			type = ev.val();

		$('.metric, .imperial').toggleClass('none');
	},

	getValues : function(){
		var values = {};
		if(!$('.metric').hasClass('none')){
			values = {
				weight1: $('.metric select[name=kg]').val(),
				weight2: $('.metric select[name=grams]').val(),
				height1: $('.metric select[name=m]').val(),
				height2: $('.metric select[name=cm]').val()
			}
		}else if(!$('.imperial').hasClass('none')){
			values = {
				weight1: $('.imperial select[name=lbs]').val(),
				weight2: $('.imperial select[name=oz]').val(),
				height1: $('.imperial select[name=ft]').val(),
				height2: $('.imperial select[name=in]').val()
			}
		}
		values.species = $('#species').val();
		values.released = $('.metric select[name=released]').val();
		values.weightType = $('input[name=weightsystem]:checked').val();
		values.imagename = RN.glb.views.addCatchView.image;

		return values;
	},

	convertValues : function(data){
		var convertedValue;
		if(data.weightType === "metric"){
			convertedValue = (parseInt(data.weight1 * 1000)) + parseInt(data.weight2);
		}else {
			convertedValue = (parseInt(data.weight1 * 16)) + parseInt(data.weight2);
		}
		return convertedValue;
	},

	addCatchPhoto : function(ev){
		var imageName = Date.now(),
			self = this;
		RN.fnc.camera.shoot(function () {
				self.image = imageName;

				var data = self.getValues();

				self.render();

				$('#species').val(data.species)
				$('input[name=weightsystem]:checked').val(data.weightType)
				$('select[name=lbs]').val(data.weight1)
				$('select[name=oz]').val(data.weight2)
				$('select[name=ft]').val(data.height1)
				$('select[name=in]').val(data.height2)
				$('select[name=released]').val(data.released)
			},
			{
				url: RN.glb.url.ajax + 'trip/uploadCatchImage',
				params: {
					uid: RN.user.get('uid'),
					tip: RN.currentTrip.get('tid'),
					imagename: imageName,
				}
			}
		)
	},
	saveFirstPageOfCatch : function(){
		var dataToSave = this.getValues();
		dataToSave.weight = this.convertValues(dataToSave);
		RN.fnc.catch.saveTempCatchToObject(dataToSave);
		RN.router.navigate('confirmcatch', true);
	},

	substringMatcher : function(strs) {
		return function findMatches(q, cb) {
			var matches, substrRegex;

			// an array that will be populated with substring matches
			matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					// the typeahead jQuery plugin expects suggestions to a
					// JavaScript object, refer to typeahead docs for more info
					matches.push({ value: str });
				}
			});

			cb(matches);
		};
	},

	checkReady : function(ev){
		var ev = $(ev.currentTarget),
			ready = false;

		if($('#species').val().length > 0){
			ready = true;
		}

		if(ready){
			$('.nextcatch').show();
		}else{
			$('.nextcatch').hide();
		}
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home({
			ldsDefault: -1,
			image: self.image
		}));

		var states = ['Angler fish','Bass','Bream Black','Bream Red','Bream Gilthead','Brill','Bull Huss','Catfish','Coalfish','Cod','Dab','Eel Conger','Flounder','Garfish','Gurnard Red','Gurnard Tub','Haddock','John Dory','LS Dogfish','Ling','Mackerel','Megrim','Monkfish','Mullet (Thick Lipped)','Mullet (Golden Grey)','Mullet (Think Lipped)','Mullet (Red)','Plaice','Pollack','Pouting','Ray (Blonde)','Ray (S E / Painted)','Ray (Spotted/Homelyn)','Ray (Sting)','Ray (Thornback)','Ray (Undulated)','Rockling','Scad','Shark (Blue)','Shark (Mako)','Shark (Porbeagle)','Shark (Thresher)','Silver Eel','Smoothhounds','Sole','Spur Dog','Tope','Trigger Fish','Turbot','Weever','Whiting','Wrasse (Ballan)','Wrasse (Corkwing)','Wrasse (Cuckoo)'
		];

		if(RN.glb.url.envioment === "liveApp") {
			$('.nextcatch').hide();
		}

		$('#species').typeahead({
				hint: false,
				highlight: true,
				minLength: 1
			},
			{
				name: 'states',
				displayKey: 'value',
				source: self.substringMatcher(states)
			}
		);
	}
});