'user strict';
var typeahead = require('typeahead.js/dist/typeahead.jquery');

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../../views/trips/catch/addcatch.jade'),
	},

	events: {
		'click .addcatch': 'moveToCatch',
	},

	saveFirstPageOfCatch : function(){

		var dataToSave = {
			species: $('#species').val(),
			weightType: $('input[name=weightsystem]:checked').val(),
			weight1: $('select[name=lbs]').val(),
			weight2: $('select[name=oz]').val(),
			height1: $('select[name=ft]').val(),
			height2: $('select[name=in]').val(),
			released: $('select[name=released]').val(),
		};

		RN.previousTrip.saveCatchToObject('catches', dataToSave);
		RN.router.navigate('trippreviousconfirmcatch', true);
	},

	moveToCatch : function(ev){
		RN.router.navigate('trippreviousaddcatch', true);
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
	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home({
			ldsDefault: -1
		}));

		var states = ['Angler fish','Bass','Bream Black','Bream Red','Bream Gilthead','Brill','Bull Huss','Catfish','Coalfish','Cod','Dab','Eel Conger','Flounder','Garfish','Gurnard Red','Gurnard Tub','Haddock','John Dory','LS Dogfish','Ling','Mackerel','Megrim','Monkfish','Mullet (Thick Lipped)','Mullet (Golden Grey)','Mullet (Think Lipped)','Mullet (Red)','Plaice','Pollack','Pouting','Ray (Blonde)','Ray (S E / Painted)','Ray (Spotted/Homelyn)','Ray (Sting)','Ray (Thornback)','Ray (Undulated)','Rockling','Scad','Shark (Blue)','Shark (Mako)','Shark (Porbeagle)','Shark (Thresher)','Silver Eel','Smoothhounds','Sole','Spur Dog','Tope','Trigger Fish','Turbot','Weever','Whiting','Wrasse (Ballan)','Wrasse (Corkwing)','Wrasse (Cuckoo)'
		];

		$('#species').typeahead({
				hint: false,
				highlight: true,
				minLength: 1
			},
			{
				name: 'states',
				displayKey: 'value',
				source: self.substringMatcher(states)});
	}
});