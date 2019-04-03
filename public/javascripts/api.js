if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function obtain_data(symbol, type, maxn, callback) {
	$.get({
	  url: "/api/his_data",
	  data: {
	    symbol: symbol,
	    maxn: maxn
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
};

function obtain_symbol_list(callback) {
	$.get({
	  url: "/api/symbols",
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_userlist(callback) {
	$.get({
	  url: "/api/userlist",
	  success: function( result ) {
	    callback(result);
	  }
	});
}


function get_userprofile(callback) {
	$.get({
	  url: "/api/userprofile",
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_newest_stock(symbol, callback) {
	$.get({
	  url: "/api/neweststock",
	  data: {
	  	symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function get_stock_prediction(symbol, callback) {
	$.get({
	  url: "/api/stockprediction",
	  data: {
	  	symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function favorite_list_add(symbol, callback) {
	$.post({
		url: "/api/subscribestock",
	  data: {
	  	symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}

function favorite_list_remove(symbol, callback) {
	$.post({
		url: "/api/unsubscribestock",
	  data: {
	  	symbol: symbol
	  },
	  success: function( result ) {
	    callback(result);
	  }
	});
}