import { Request, Response, Express } from "express";
import { createUser, getUsers, sendEmail } from "../helpers/userHelpers";
import { responseObject, statusMessage } from "../../config/setResponses";

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
			const { host } = req.headers;
			console.info({ userObj });

			const check = await createUser(userObj);
			// Send email to the user to check if the email is valid or not

			// const response = await sendEmail(userObj, host || "localhost");
			// let response: responseObject = check ? 200 : 400;

			res.json(check);

			// res
			// 	.status(response)
			// 	.json(response === 200 ? check : statusMessage["someThingWentWrong"]);
		});
};
