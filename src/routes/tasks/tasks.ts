import { Request, Response, Express } from "express";
import verify from "../../middlewares/verify";
import { customRequest } from "../../models/requestModel";

export = (app: Express) => {
	console.info("---- User ----");

	app
		.route("/tasks/:userId")
		.get(verify(), async (req: Request, res: Response) => {
			const { userId } = res.locals;
			console.info({ userId });
			// res.json({ message: "Tasks" });
			// res.redirect("/google");

			// Get Tasks for Particular User
		})
		.post(async (req: Request, res: Response) => {});
};
