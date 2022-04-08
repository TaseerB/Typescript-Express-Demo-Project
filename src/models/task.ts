"use strict";
import sequelize from "../config/db";
import { Model, DataTypes } from "sequelize";
import User from "./user";

class Tasks extends Model {
	declare taskId: number;
	// declare userId: number;
	declare taskName: string;
	declare taskDetail: string;
	declare attachment: string;
}

Tasks.init(
	{
		taskName: DataTypes.STRING,
		taskDetail: DataTypes.STRING,
		attachment: DataTypes.STRING,
		// userId: DataTypes.NUMBER,
	},
	{
		sequelize,
		modelName: "Tasks",
	}
);

Tasks.belongsTo(User, {
	foreignKey: "userlId",
	as: "User",
});

export default Tasks;
