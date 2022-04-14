// Importing required libraries
const cron = require("node-cron");

import { sendMail } from "../services/common";
// app = express(); // Initializing app

// Creating a cron job which runs on every 10 second
cron.schedule("*/5 * * * * *", () => {
	// let data = `${new Date().toUTCString()} : Server is working\n`;
	// console.info(data);
	// console.log("running a task every 10 second");
});
