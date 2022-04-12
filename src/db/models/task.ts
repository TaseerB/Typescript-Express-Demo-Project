"use strict";
import sequelize from "../config/db";
import { Model, DataTypes } from "sequelize";
import User from "./user";

class Task extends Model {
	declare taskId: number;
	// declare userId: number;
	declare taskName: string;
	declare taskDetail: string;
	declare attachment: string;
}

Task.init(
	{
		taskId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		taskName: {
			type: DataTypes.STRING,
		},
		taskDetail: {
			type: DataTypes.STRING,
		},
		attachment: {
			type: DataTypes.STRING,
		},
		taskStatus: {
			type: DataTypes.ENUM,
			values: ["COMPLETED", "PENDING"],
		},
		completionTime: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName: "Tasks",
	}
);

Task.belongsTo(User, {
	foreignKey: "userId",
	as: "User",
});

export default Task;
