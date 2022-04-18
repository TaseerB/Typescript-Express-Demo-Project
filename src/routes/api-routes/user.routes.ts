import passport from "passport";

import { somethingWentWrong } from "../../services/common.service";

// User Controllers
import {
	getUsers,
	createOrFindUser,
	deleteUser,
	loginUser,
	googleAuthUser,
	verifyUser,
	resetPassword,
	updatePassword,
} from "../controllers/users.controller";

// MiddleWares
import { verify } from "../middlewares/verify";
import {
	validateLogin,
	validateSignUp,
} from "../middlewares/schema/user.validator";
import "../../db/config/passport";

export = (router: any) => {
	try {
		console.info("---- Usersroutes ----");

		router
			.get("/users", getUsers)
			.post("/users", validateSignUp, createOrFindUser)
			.delete("/users", verify, deleteUser);

		// Auth Routes
		router.post("/login", validateLogin, loginUser);
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

		// Password reset flow
		router.post("/password-reset", resetPassword);
		router.post("/password-update/:userId/:email", updatePassword);
		// router.post("/update-password", verify);
	} catch (e) {
		console.error({ e });
		router.redirect("/error", somethingWentWrong);
	}
};
