import { Express, Request, Response } from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import "../../config/passport";
import { UserInterface } from "../../models/interfaces";
import { createUser } from "../helpers/userHelpers";
import jwt, { Secret } from "jsonwebtoken";

// const  = helperFunctions;

export = (app: Express) => {
	app.use(
		cookieSession({
			name: "google-auth-session",
			keys: ["key1", "key2"],
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	// Redirects to the goole UI for Signin
	app.route("/google").get(
		passport.authenticate("google", {
			scope: ["email", "profile"],
		})
	);

	// After User Verification
	app.route("/google/callback").get(
		passport.authenticate("google", {
			failureRedirect: "/failed",
		}),
		async (req: Request, res: Response) => {
			const user: any = req.user;
			const userJsonObj = user._json;
			let userId: any;
			const secret: Secret = process.env.SECRET || "test";

			console.info({ userJsonObj });
			// let userId: any = 1;

			const userObj: UserInterface = {
				role: "user",
				firstName: userJsonObj?.given_name,
				lastName: userJsonObj?.familyName,
				email: userJsonObj?.email,
				password: null,
				state: "verified",
				authType: "google",
			};

			const usercreated: any = await createUser(userObj);

			console.info({ usercheck: usercreated?.user?.dataValues });
			userId = usercreated?.user?.dataValues?.userId;

			console.info({ check: userId });
			const token: String = jwt.sign(
				{
					userId,
					email: userObj.email,
					firstName: userObj.firstName,
				},
				secret
			);
			res.status(200).json({
				message: token,
			});
		}
	);
};
