'use strict'

var sendResetPassword = require('../mailer/sendResetPassword')

var baseController = {

	sendEmail: function(req, res){
		sendResetPassword('cr@gmail.com', 'Cristian', 'cristiangno');
		return res.send('Hola')
	}

};


module.exports = baseController;