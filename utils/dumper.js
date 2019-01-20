'use strict'

function dd(...args){
	args.map(function(arg){
		console.log(arg);
	});
}

module.exports = {
	dd
}

