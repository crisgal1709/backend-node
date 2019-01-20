'use strict'

//var urlMongo = process.env.MONGODB_URI || 'mongodb+srv://crisgal:thewise@cluster0-0rg4n.mongodb.net/test?retryWrites=true';

const Config = {
	port: process.env.PORT || 4000,
	urlMongo: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
	SECRET_TOKEN: 'FLDGq4rX/PvJfAP+RXXO9/nxKhI1o13magX6lruibIs=',
	MAIL_HOST: 'smtp.mailtrap.io',
	MAIL_PORT: '2525',
	MAIL_USERNAME: 'd75ecf8b06b4f1',
	MAIL_PASSWORD: '4feb917b9a720b',
	MAIL_ENCRYPTION: null,
	MAIL_FROM: 'backend-node <info@backend-node.com>'
}


module.exports = Config;