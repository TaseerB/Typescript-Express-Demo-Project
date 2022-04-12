import User from "../db/models/user";
import bcrypt from "bcrypt";
import { UserInterface } from "../db/models/interfaces";

const checkRole = (role: String) => role === "admin" || role === "user";

/**
 * Main Helper Functions to be used in routes
 */

const getUsersFromDb = async () => User.findAll();

const getUserById = async (userId: number) => User.findByPk(userId);

const getUserByEmail = async (useremail: string) =>
	User.findOne({ where: { email: useremail } });

const createUser = async (userObj: User | UserInterface) => {
	console.info({ createUser: userObj });

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
			authType: "system",
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

const deleteUserById = async (inputObj: any) => {
	console.info({ deleteUserById: inputObj });
	const { userId } = inputObj;
	return User.destroy({
		where: { userId },
	});
};

export {
	getUsersFromDb,
	createUser,
	deleteUserById,
	getUserByEmail,
	getUserById,
};
