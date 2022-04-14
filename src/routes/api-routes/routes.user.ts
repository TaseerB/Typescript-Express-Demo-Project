import passport from "passport";

import { somethingWentWrong } from "../../services/common";

// User Controllers
import {
	getUsers,
	createOrFindUser,
	deleteUser,
	loginUser,
	googleAuthUser,
	verifyUser,
} from "../controllers/users.controller";

// MiddleWares
import { verify } from "../middlewares/verify";
import "../../db/config/passport";

export = (router: any) => {
	try {
		console.info("---- Usersroutes ----");

		router
			.get("/users", getUsers)
			.post("/users", createOrFindUser)
			.delete("/users", verify, deleteUser);

		// Auth Routes
		router.post("/login", loginUser);
		router.get("/verify/:email/:userId", verifyUser);

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
	} catch (e) {
		console.error({ e });
		router.redirect("/error", somethingWentWrong);
	}
};
