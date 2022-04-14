import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// Service Functions
import {
	createUser,
	getUsersFromDb,
	deleteUserById,
} from "../../services/userHelpers";

// Models
import User from "../../db/models/user";
import { UserInterface } from "../../db/models/interfaces";

// Common Functions
import { sendMail } from "../../services/common";

export const getUsers = async (req: Request, res: Response) => {
	const response = await getUsersFromDb();
	res.json(response);
};

export const createOrFindUser = async (req: Request, res: Response) => {
	const userObj = req.body;
	const { host } = req.headers;
	console.info({ userObj });

	const user: any = await createUser(userObj);
	// Send email to the user to check if the email is valid or not

	// var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
	// token.save(function (err) {

	const text =
		"Hello " +
		userObj.name +
		",\n\n" +
		"Please verify your account by clicking the link: \nhttp://" +
		req.headers.host +
		"/verify/" +
		userObj.email +
		"/" +
		user?.user?.userId +
		"\n\nThank You!\n";

	const check = sendMail({
		email: userObj.email,
		text,
	});
	// let response: responseObject = check ? 200 : 400;

	res.status(200).json({ user });
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
	const user: any = req?.user;
	const userJsonObj = user?._json;
	let userId: any;
	const secret: Secret = process.env.SECRET || "test";

	console.info({ userJsonObj });
	// let userId: any = 1;

	const userObj: UserInterface = {
		// userId: parseInt(userJsonObj?.sub, 10),
		role: "user",
		firstName: userJsonObj?.given_name,
		lastName: userJsonObj?.family_name,
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

export const verifyUser = async (req: Request, res: Response) => {
	console.info("-- In verify --");
	// const secret: Secret = process.env.SECRET || "test";
	// const { password, email } = req.body;

	const { userId, email } = req.params;

	const user = await User.findOne({
		where: { email, userId, state: "UN-VERIFIED" },
	});

	if (user) {
		console.info("-- User is unverified --");

		await User.update(
			{ state: "VERIFIED" },
			{
				where: {
					email,
				},
			}
		);

		res.json({ message: "User Confirmed" });
	} else {
		// res.status(404).json({ error: "User Already Verified" });
		res.redirect("/login");
	}
};
