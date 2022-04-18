// Importing required libraries
import cron from "node-cron";
import { appendFile } from "fs/promises";

import { getTasksStats } from "../../services/reports.service";
import { getUserById } from "../../services/user.service";
import { getFormatTasksStats } from "../../services/reports.service";
import { getCompletedTasks } from "../../services/tasks.service";

import { sendMail } from "../../services/common.service";
// app = express(); // Initializing app
// import "";

// Creating a cron job which runs on every hour "* * */1 ? * *"
// try {
// 	cron.schedule("*/30 * * * *", async () => {
// 		const getStats: any = await getTasksStats(null);
// 		const path = "./downloads/" + new Date().toISOString() + ".json";

// 		console.info({ path });

// 		console.info({ stats: getStats.rows.length, rows: getStats.rows });

// 		console.info("--- wiritng file ---");
// 		const res = await appendFile(path, JSON.stringify(getStats), {
// 			encoding: "utf-8",
// 		});

// 		console.info(res);
// 		console.info("--- file written ---");

// 		let data = `${new Date().toUTCString()} : Server is working\n`;
// 		console.info({ data });
// 		console.log("running a task every min");
// 	});
// } catch (e) {
// 	console.error({ e });
// }

// export = (cron: any) => {
try {
	cron.schedule("0 0 12 * * ?", async () => {
		console.info("--- Email Cron for Pending Tasks ----");
		const getStats: any = await getTasksStats({ taskStatus: "PENDING" });
		// let task;
		console.info({ chek: getStats.rows });

		for (const ts of getStats.rows) {
			// getStats.rows.forEach((ts: any, index: number) => {
			console.info({ ch: ts?.dataValues });

			const user: any = await getUserById(ts?.dataValues?.userId);
			console.info({ cehck: user?.dataValues?.email });

			const pt = ts?.dataValues?.taskName + " : " + ts?.dataValues?.taskDetail;

			let html = ` 
				<h1>Pending Tasks</h1>
				<h2>${pt}</h2>
			`;

			await sendMail({
				email: user?.dataValues?.email,
				text: null,
				html,
				subject: "Pending Tasks!",
			});

			// });
		}

		// tasks.forEach(())
	});
} catch (e) {
	console.error({ e });
}

// const getUserPendingTasks = () => {};
