import User from "../../models/user";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import { UserInterface } from "../../models/interfaces";

const checkRole = (role: String) => role === "admin" || role === "user";

/**
 * Main Helper Functions to be used in routes
 */
const sendEmail = async (userObj: User | UserInterface, host: string) => {
	const { firstName, lastName, email, role, password, state } = userObj;

	// const token = crypto.randomBytes(16).toString("hex");

	sgMail.setApiKey("");

	const text =
		"Hello " +
		firstName +
		",\n\n" +
		"Please verify your account by clicking the link: \nhttp://" +
		host +
		"/verify/" +
		email +
		"/" +
		"abc" +
		"\n\nThank You!\n";

	const msg = {
		to: "taseer.baig@emumba.com",
		from: "taseer.baig@gmail.com", // Use the email address or domain you verified above
		subject: "Account Confirmation",
		text,
	};

	await sgMail.send(msg);

	return text;
};

const createUser = async (userObj: User | UserInterface): Promise<object> => {
	const salt = await bcrypt.genSalt(10);
	const { firstName, lastName, email, role, password, state } = userObj;
	let userpassword: string | null = null;

	if (password) userpassword = await bcrypt.hash(password, salt);

	if (!checkRole(role)) return {};

	const [user, created] = await User.findOrCreate({
		where: { email },
		defaults: {
			firstName,
			lastName,
			email,
			role,
			password: userpassword,
			state,
		},
	});

	// Create User In DB
	// const user = await User.create(
	// 	{
	// 		firstName,
	// 		lastName,
	// 		email,
	// 		role,
	// 		password: userpassword,
	// 		state,
	// 	},
	// 	{ fields: ["firstName", "lastName", "email", "role", "password", "state"] }
	// );

	// console.info({ user, password });

	return { user, created };
};

const getUsers = async (): Promise<object> => await User.findAll();

export { getUsers, createUser, sendEmail };
