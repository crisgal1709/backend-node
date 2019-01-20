'use strict'

var nodemailer = require('nodemailer')
const config = require('../config');

var transport = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  auth: {
    user: config.MAIL_USERNAME,
    pass: config.MAIL_PASSWORD
  }
});

module.exports = transport

