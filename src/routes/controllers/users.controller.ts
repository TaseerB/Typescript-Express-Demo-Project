import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
	createUser,
	getUsersFromDb,
	deleteUserById,
} from "../helpers/userHelpers";

import User from "../../models/user";
import { UserInterface } from "../../models/interfaces";

export const getUsers = async (req: Request, res: Response) => {
	const response = await getUsersFromDb();
	res.json(response);
};

export const createOrFindUser = async (req: Request, res: Response) => {
	const userObj = req.body;
	const { host } = req.headers;
	console.info({ userObj });

	const check = await createUser(userObj);
	// Send email to the user to check if the email is valid or not

	// const response = await sendEmail(userObj, host || "localhost");
	// let response: responseObject = check ? 200 : 400;

	res.json(check);
};

export const deleteUser = async (req: Request, res: Response) => {
	const userObj = req.body;
	console.info({ userObj });
	const deletedUser = await deleteUserById(userObj);

	res.status(200).json({ message: deletedUser });
};

export const loginUser = async (req: Request, res: Response) => {
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
				{ userId: user.userId, email: user.email, firstName: user.firstName },
				secret
			);
			res.status(200).json({ token });
		} else {
			res.status(400).json({ error: "Password Incorrect" });
		}
	} else {
		res.status(404).json({ error: "User does not exist" });
	}
};

export const googleAuthUser = async (req: Request, res: Response) => {
	const user: any = req.user;
	const userJsonObj = user._json;
	let userId: any;
	const secret: Secret = process.env.SECRET || "test";

	console.info({ userJsonObj });
	// let userId: any = 1;

	const userObj: UserInterface = {
		// userId: parseInt(userJsonObj?.sub, 10),
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

	const userFromGoogleAuth: any = res?.req?.user;
	const getUserId: any = userFromGoogleAuth.id;

	console.info({ userFromGoogleAuth, getUserId });

	res.redirect("/tasks");
};
