import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface User {}

class User extends Model {
	declare id: number;
	declare role: "admin" | "user";
	declare firstName: string;
	declare lastName: string;
	declare email: string;
	declare password: string;
	declare state: "verified" | "un-verified";
	// User: any;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		role: {
			type: DataTypes.STRING,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		state: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name
	}
);

// (async () => {
// 	await sequelize.sync({ force: true });
// })();

export default User;
