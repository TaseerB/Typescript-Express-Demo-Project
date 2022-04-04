import { Express } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export = (app: Express) => {
	app.route("/login").post(async (req, res) => {
		const secret: Secret = process.env.SECRET || "test";
		const { password, email } = req.body;

		const user = await User.findOne({ where: { email: email } });

		if (user) {
			const validPassword: Boolean = await bcrypt.compare(
				password,
				user.password
			);
			if (validPassword) {
				const token: String = jwt.sign(
					{ id: user.id, email: user.email, firstName: user.firstName },
					secret
				);
				res.status(200).json({ token });
			} else {
				res.status(400).json({ error: "Password Incorrect" });
			}
		} else {
			res.status(404).json({ error: "User does not exist" });
		}
	});
};
