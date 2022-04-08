import { Request, Response, Express } from "express";
import verify from "../../middlewares/verify";
import { customRequest } from "../../models/requestModel";
import { createTask, getTasks } from "../helpers/taskHelpers";

export = (app: Express) => {
	console.info("---- User ----");

	app
		.route("/tasks")
		.get(verify(), async (req: Request, res: Response) => {
			const { userId } = res.locals;

			console.info({ userId });

			const tasks = await getTasks(userId);

			res.json({ message: tasks });

			// Get Tasks for Particular User
		})
		.post(verify(), async (req: Request, res: Response) => {
			const { userId } = res.locals;
			req.body.userId = userId;

			const task = await createTask(req.body);

			res.json({ message: task });
		});
};
