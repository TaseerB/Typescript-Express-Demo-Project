import User from "../db/models/user";
import bcrypt from "bcrypt";
import { UserInterface } from "../db/models/interfaces";

const checkRole = (role: String) => role === "admin" || role === "user";

/**
 * Main Helper Functions to be used in routes
 */

const getUsersFromDb = async () => User.findAll();

const getUserById = async (userId: number) => User.findByPk(userId);

const getUserByEmail = async (email: string) =>
	User.findOne({ where: { email, state: "VERIFIED" } });

// const user = await User.findOne({
// 	where: { email: email, state: "VERIFIED" },
// });

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

const updateUser = async (inputObj: any, updateObject: any) => {
	let updateobject: any = {};

	Object.entries(updateObject).forEach(([key, value]) => {
		console.info({ key, value });
		if (value) updateobject[key] = value;
	});

	// updateobject.updatedAt = "2022-04-17T00:00:00.000Z";

	if (Object.entries(updateobject).length > 0) {
		console.info({ updateobject });

		// if password is provided in update through reset....

		return User.update(updateobject, {
			where: inputObj,
		});
	}
};

const updatePasswordInDb = async (inputObj: any) => {
	let { password, userId, email } = inputObj;

	const salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);

	return User.update(
		{ password },
		{
			where: {
				userId,
				email,
			},
		}
	);
};

export {
	getUsersFromDb,
	createUser,
	deleteUserById,
	getUserByEmail,
	getUserById,
	updateUser,
	updatePasswordInDb,
};
