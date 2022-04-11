import { Router } from "express";
import passport from "passport";

// User Controllers
import {
	getUsers,
	createOrFindUser,
	deleteUser,
	loginUser,
	googleAuthUser,
} from "./controllers/users.controller";

// Task Controllers
import {
	getTasks,
	createTask,
	getTaskById,
	editTaskById,
	deleteTaskById,
} from "./controllers/tasks.controller";

// Middlewares
import { taskByIdInput } from "./middlewares/taskByIdInput";
import { verify } from "./middlewares/verify";
import "../config/passport";

console.info("---- Routes ----");

// Defining Router
const router = Router();

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

// Task by Id routes
router
	.get("/tasks/:taskId", taskMiddlewareFunctions, getTaskById)
	.put("/tasks/:taskId", taskMiddlewareFunctions, editTaskById)
	.delete("/tasks/:taskId", taskMiddlewareFunctions, deleteTaskById);

export default router;
