import { Express, Request, Response } from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import "../../config/passport";
import { UserInterface } from "../../models/interfaces";
import helperFunctions from "../helpers/userHelpers";
const { createUser } = helperFunctions;

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
			let userId: any = 1;

			const userObj: UserInterface = {
				role: "user",
				firstName: user?.name?.displayName,
				lastName: user?.givenName?.familyName,
				email: user?.email,
				password: null,
				state: "verified",
			};

			try {
				const user = await createUser(userObj);
				console.info({ user });
				// if (user) userId = user?.dataValues?.id;
			} catch (e) {
				console.error({ e });
				// if user already exists get user id here
			}

			console.info({ check: req, check2: req?.headers?.cookie });
			res.redirect(`/tasks/:${userId}`);
		}
	);
};
