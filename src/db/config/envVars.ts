import * as dotenv from "dotenv";
dotenv.config();

export const envVariables = {
	port: process?.env?.PORT || 3000,
	host: process?.env?.host || "localhost",
	clientID: process?.env?.CLIENTID || "test",
	clientSecret: process?.env?.CLIENTSECRET || "test",
	password: process?.env?.DB_PASSWORD,
	database: process?.env?.DB_NAME,
	dialect: process?.env?.DB_DRIVER,
	username: process?.env?.DB_USER,
};
