import { Router } from "express";

// common functions
import { somethingWentWrong } from "../services/common.service";

import "./api-routes/cron.routes";
import userRoutes from "./api-routes/user.routes";
import taskRoutes from "./api-routes/task.routes";
import reportsRoutes from "./api-routes/reports.routes";

// cron route
import "./api-routes/cron.routes";

let router: any;

try {
	const date = new Date();
	console.info({ date });
	console.info("---- Routes ----");

	// Defining Router
	router = Router();

	//  ------- Setting Routes and calling necessary controllrers ------- //
	// User Routes
	userRoutes(router);

	// Tasks Routes
	taskRoutes(router);

	// Reports Routes
	reportsRoutes(router);
} catch (e) {
	console.error({ e });
	router.get("/error", somethingWentWrong);
}

export default router;
