import { Router } from "express";
import passport from "passport";

//----------------------//
//---- Controllers ----//
//---------------------//

// User
import {
	getUsers,
	createOrFindUser,
	deleteUser,
	loginUser,
	googleAuthUser,
	verifyUser,
} from "./controllers/users.controller";

// Tasks
import {
	getTasks,
	createTask,
	getTaskById,
	editTaskById,
	deleteTaskById,
	fileAttachment,
} from "./controllers/tasks.controller";

// Reports
import {
	tasksStats,
	tasksCompletion,
	tasksCompletedAfterDueTime,
	tasksCompletionSingleDay,
} from "./controllers/reports.controller";

// ------------------- //
// --- Middlewares --- //
// ------------------- //
import { taskByIdInput } from "./middlewares/taskByIdInput";
import { verify } from "./middlewares/verify";
import upload from "./middlewares/multerSetup";
import "../db/config/passport";

// common functions
import { somethingWentWrong } from "../services/common";

import "./routes.cron";

let router: any;

try {
	const date = new Date();
	console.info({ date });
	console.info("---- Routes ----");

	// Defining Router
	router = Router();

	// Middleware Function Stack
	const taskMiddlewareFunctions = [verify, taskByIdInput];

	//  ------- Setting Routes and calling necessary controllrers ------- //

	// Users Routes
	console.info("---- Users routes ----");
	router
		.get("/users", getUsers)
		.post("/users", createOrFindUser)
		.delete("/users", verify, deleteUser);

	// Auth Routes
	router.post("/login", loginUser);
	router.get("/verify/:email/:userId", verifyUser);

	// Google Based Auth Routes
	router.get(
		"/google",
		passport.authenticate("google", {
			scope: ["email", "profile"],
		})
	);
	router.get(
		"/google/callback",
		passport.authenticate("google", {
			failureRedirect: "/failed",
		}),
		googleAuthUser
	);

	// Tasks Routes
	console.info("---- Tasks routes ----");
	router.get("/tasks", verify, getTasks).post("/tasks", verify, createTask);

	// upload Attachement for Task
	router.post(
		"/attachment",
		verify,
		upload.single("taskAttachment"),
		fileAttachment
	);

	// Task by Id routes
	router
		.get("/tasks/:taskId", taskMiddlewareFunctions, getTaskById)
		.put("/tasks/:taskId", taskMiddlewareFunctions, editTaskById)
		.delete("/tasks/:taskId", taskMiddlewareFunctions, deleteTaskById);

	// Reports Routes
	router.get("/tasks-activity-stats", verify, tasksStats);
	router.get("/tasks-completion-stats", verify, tasksCompletion);
	router.get("/tasks-completed-late-stats", verify, tasksCompletedAfterDueTime);
	router.get(
		"/tasks-singleday-completion-stats",
		verify,
		tasksCompletionSingleDay
	);
} catch (e) {
	console.error({ e });
	router.get("/error/", somethingWentWrong);
}

export default router;
