'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config');
var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')


function createToken(user){
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
	const decoded = new Promise((resolve, reject) => {
		try{

			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if (payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			}

			resolve(payload)
		}

		catch(err){
			reject({
				status: 401,
				message: 'Invalid Token'
			})
		}
	})

	return decoded;
}

function hashPassword(password){
	try{
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), false)
	}
	catch(e){
		return false
	}
}

function comparePassword(data, encrypted){
	return bcrypt.compareSync(data, encrypted)
}

function createUrlToChangePassword(email){
	return 'http://' + config.hostname + '/base/changePassword?email=' + email
}

module.exports = {
	createToken,
	decodeToken,
	hashPassword,
	comparePassword,
	createUrlToChangePassword
}