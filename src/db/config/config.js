const dotenv = require("dotenv");
dotenv.config();

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_DRIVER;

module.exports = {
	development: {
		username,
		password,
		database,
		host,
		dialect,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
};
