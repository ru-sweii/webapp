if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

function get_liv_latest_price(symbol, callback) {
	$.get({
	  url: "/sapi/latest_stock",
	  data: {
	    symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_his_highest_price(symbol, callback) {
	$.get({
	  url: "/sapi/highest_stock",
	  data: {
	    symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_his_average_price(symbol, callback) {
	$.get({
	  url: "/sapi/average_stock",
	  data: {
	    symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_whether_avg_price_less_than(symbol, value, callback) {
	$.get({
	  url: "/sapi/average_stock",
	  data: {
	    symbol: symbol
	  },
	  success: function( result ) {
	    callback(symbol, parseFloat(result.result) < parseFloat(value));
	  }
	});
}

function get_his_lowest_price(symbol, callback) {
	$.get({
	  url: "/sapi/lowest_stock",
	  data: {
	    symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function obtain_symbol_list(callback) {
	$.get({
	  url: "/sapi/symbols",
	  success: function( result ) {
	    callback(result);
	  }
	});
}