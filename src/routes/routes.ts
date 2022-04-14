import { Router } from "express";

// common functions
import { somethingWentWrong } from "../services/common";

import "./routes.cron";
import userRoutes from "./api-routes/routes.user";
import taskRoutes from "./api-routes/routes.task";
import reportsRoutes from "./api-routes/routes.reports";

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
