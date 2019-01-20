'use strict'

const transporter = require('./transporter')
const EmailTemplate = require('email-templates');
const config = require('../config')
const path = require('path')
const hbs = require('handlebars')
const fs = require('fs');
const moment = require('moment')
const services = require('../services')

const pathTemplate = path.join(__dirname, '../views/emails/resetpass.handlebars');

const sendResetPassword = function(
		email, 
		name, 
		username, 
		urlToken = 'https://domain.com'
	){

	const source = fs.readFileSync(pathTemplate, 'UTF-8')

	var template = hbs.compile(source)

	return transporter.sendMail({
		from: config.MAIL_FROM,
		subject: 'Reset Password - ' + name,
		to: email,
		html: template({
			name: name, 
			username: username,
			urlToken: services.createUrlToChangePassword(email)
		}),
		data: moment().format('YYYY-MM-DD HH:II:SS'),
	}, (err, info) => {
		if (err) {
			console.log(err)
			return false;
		}
		console.log(info)
		return true;
	})
}

module.exports = sendResetPassword