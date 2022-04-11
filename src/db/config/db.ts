const { Sequelize } = require("sequelize");
import * as dotenv from "dotenv";
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_DRIVER;

const sequelize = new Sequelize(database, user, password, {
	host: host,
	dialect: dialect,
});

(async () => {
	await sequelize.authenticate();
})();

export default sequelize;
