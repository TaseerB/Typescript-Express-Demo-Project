import User from "../../models/user";
import bcrypt from "bcrypt";

const checkRole = (role: String) => role === "admin" || role === "user";

const createUser = async (userObj: User): Promise<Boolean | object> => {
	const salt = await bcrypt.genSalt(10);
	const { firstName, lastName, email, role, password } = userObj;

	const userpassword = await bcrypt.hash(password, salt);

	if (!checkRole(role)) return false;

	// Create User In DB
	const user = await User.create(
		{
			firstName,
			lastName,
			email,
			role,
			password: userpassword,
		},
		{ fields: ["firstName", "lastName", "email", "role", "password"] }
	);

	console.info({ user, password });

	return user;
};

const getUsers = async (): Promise<object> => await User.findAll();

export default { getUsers, createUser };
