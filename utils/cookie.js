'use strict'

function parseCookies(cookie){
	var cookies = [];
	var parsed = cookie.split(';');

	parsed.map(function(c){
	 	let co = c.split('=');
	 	cookies.push({
	 		name: co[0],
	 		value: co[1]
	 	});
	});
	return cookies;
}

module.exports = {
	parseCookies
}