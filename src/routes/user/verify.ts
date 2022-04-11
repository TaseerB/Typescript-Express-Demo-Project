import { Express, Request, Response } from "express";
import User from "../../db/models/user";
// import bcrypt from "bcrypt";
// import jwt, { Secret } from "jsonwebtoken";
// import * as dotenv from "dotenv";

// dotenv.config();

export = (app: Express) => {
	app
		.route("/verify/:email/:token")
		.get(async (req: Request, res: Response) => {
			console.info("-- In verify --");
			// const secret: Secret = process.env.SECRET || "test";
			// const { password, email } = req.body;

			const { token, email } = req.params;

			const user = await User.findOne({
				where: { email, state: "un-verified" },
			});

			if (user) {
				console.info("-- User is unverified --");

				if (token === "abc") {
					await User.update(
						{ state: "verified" },
						{
							where: {
								email,
							},
						}
					);
				}

				res.json({ message: "User Confirmed" });
			} else {
				// res.status(404).json({ error: "User Already Verified" });
				res.redirect("/login");
			}
		});
};
