/**
 * Created by Hutber on 23/02/2015.
 */
module.exports = {
	checkParseOrObject: function (data) {
		if (typeof data !== typeof undefined && data !== null && typeof data !== "object" && typeof data !== "string") {
			return JSON.parse(data);
		}  else if (typeof data !== typeof undefined && (data.substring(0,1) === "{" || data.substring(0,1) === "[")) {
            return JSON.parse(data);
		}  else if (typeof data === "object" || typeof data === "string") {
			return data;
		} else {
			return null;
		}
	},
	rebuildObject : function(item){
		var listOfItems = {},
			self = this;
		Object.keys(item).forEach(function(key, val, stuff){
			listOfItems[key] = self.checkParseOrObject(item[key]);
		});

		return listOfItems;
	},
	convertToString : function(data){
		if (typeof data === "object") {
			return JSON.stringify(data);
		}else {
			return data;
		}
	},
}