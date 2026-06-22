'use strict';
require('dotenv').config();

const dbLogging = process.env.DB_LOGGING === 'true' ? console.log : false;

module.exports = {
	development: {
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || 'node_js_backend',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: process.env.DB_DIALECT || 'mysql',
		timezone: process.env.TIMEZONE_GMT || '+03:00',
		logging: dbLogging
	},
	test: {
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || 'node_js_backend',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: process.env.DB_DIALECT || 'mysql',
		timezone: process.env.TIMEZONE_GMT || '+03:00',
		logging: dbLogging
	},
	production: {
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME_PROD || 'database_production',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: process.env.DB_DIALECT || 'mysql',
		timezone: process.env.TIMEZONE_GMT || '+03:00',
		logging: dbLogging
	}
};
