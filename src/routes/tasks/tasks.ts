import { Request, Response, Express } from "express";
import verify from "../../middlewares/verify";
import { customRequest } from "../../models/requestModel";

export = (app: Express) => {
	console.info("---- User ----");

	app
		.route("/tasks")
		.get(verify(), async (req: Request, res: Response) => {
			const { user } = res.locals;
			console.info({ user });
			res.json({ message: "Tasks" });

			// Get Tasks for Particular User
		})
		.post(async (req: Request, res: Response) => {});
};
