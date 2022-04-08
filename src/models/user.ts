import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Tasks from "./task";

class User extends Model {
	declare userId: number;
	declare role: "admin" | "user";
	declare firstName: string;
	declare lastName: string;
	declare email: string;
	declare password: string;
	declare state: "verified" | "un-verified";
	declare authType: string;
}

User.init(
	{
		userId: {
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
		authType: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name
	}
);

// User.hasOne(Tasks);

// (async () => {
// 	await sequelize.sync({ force: true });
// })();

export default User;
