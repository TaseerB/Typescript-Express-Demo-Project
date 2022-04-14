// Tasks Controllers
import {
	getTasks,
	createTask,
	getTaskById,
	editTaskById,
	deleteTaskById,
	fileAttachment,
} from "../controllers/tasks.controller";

// Middlewares
import { taskByIdInput } from "../middlewares/taskByIdInput";
import { verify } from "../middlewares/verify";
import upload from "../middlewares/multerSetup";

export = (router: any) => {
	console.info("---- Task routes ----");

	// Middleware Function Stack
	const taskMiddlewareFunctions = [verify, taskByIdInput];

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
};
