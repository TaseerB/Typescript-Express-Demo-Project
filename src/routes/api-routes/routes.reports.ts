// Controllers
import {
	tasksStats,
	tasksCompletion,
	tasksCompletedAfterDueTime,
	tasksCompletionSingleDay,
	sameTasks,
} from "../controllers/reports.controller";

// Middlewares
import { verify } from "../middlewares/verify";

export = (router: any) => {
	router.get("/tasks-activity-stats", verify, tasksStats);
	router.get("/tasks-completion-stats", verify, tasksCompletion);
	router.get("/tasks-completed-late-stats", verify, tasksCompletedAfterDueTime);
	router.get(
		"/tasks-singleday-completion-stats",
		verify,
		tasksCompletionSingleDay
	);

	router.get("/similar-tasks", verify, sameTasks);
};
