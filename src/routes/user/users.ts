import { Request, Response, Express } from "express";
import helperFunctions from "../helpers/userHelpers";
import { responseObject, statusMessage } from "../../config/setResponses";
// import { checkRole } from "../../middlewares/user";

// console.log("The table for the User model was just (re)created!");

const { createUser, getUsers } = helperFunctions;

export = (app: Express) => {
	console.info("---- User ----");

	app
		.route("/users")
		.get(async (req: Request, res: Response) => {
			const response = await getUsers();
			res.json(response);
		})
		.post(async (req: Request, res: Response) => {
			const userObj = req.body;
			console.info({ userObj });
			const check = await createUser(userObj);
			let response: responseObject = check ? 200 : 400;

			res
				.status(response)
				.json(response === 200 ? check : statusMessage["someThingWentWrong"]);
		});
};
