var convert = require('convert-units');
module.exports = function () {
	'use strict';

	var hw = {
		weight: {}
	};

	hw.weight.convert = convert;

	//RN.fnc.heightweight.convert(smallValue).from('g').to('oz');
	hw.weight.convertToOz = function(data, type){
		var viewsData = {},
			value = convert(data).from('g').to('oz').toString().split('.');

		viewsData.weight1 = value[0]
		if(type === "metric") {
			viewsData.weight2 = Math.round(value[1].substr(0, 2) / 15)
		}else{
			viewsData.weight2 = null;
		}

		return viewsData;
	}
	hw.weight.convertFromOz = function(data, type){
		var viewsData = {},
			value = convert(data).from('oz').to('g').toString().split('.');

		viewsData.weight1 = value[0]
		if(type === "metric") {
			viewsData.weight2 = Math.round(value[1].substr(0, 2) / 15)
		}else{
			viewsData.weight2 = null;
		}

		return viewsData;
	}


	hw.weight.convertToSmallest = function(data, type){
		var convertedValue;
		if(type === "metric"){
			convertedValue = (parseInt(data.weight1 * 1000)) + parseInt(data.weight2);
		}else {
			convertedValue = (parseInt(data.weight1 * 16)) + parseInt(data.weight2);
		}
		return convertedValue;
	};

	hw.weight.convertMetric = function(data){
		var converted = hw.convert(RN.glb.views.addCatchView.convertValues(viewsData)).from('g').to('oz');
		converted = converted.toString().split('.');
		viewsData.weight1 = converted[0]
		viewsData.weight2 = Math.round(converted[1].substr(0, 2)/15)
	};

	hw.weight.getFirstWeight = function (data, type) {
		var smallValue = hw.weight.convertToSmallest(data, type);
		var converted = hw.weight.convertFromOz(data, type);
		 return converted[0];
	}

	return hw;
};