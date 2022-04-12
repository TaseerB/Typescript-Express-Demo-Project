import Task from "../db/models/task";
import { TaskInterface } from "../db/models/interfaces";
import { taskByIdInterface } from "../db/models/interfaces";
import { Op, col } from "sequelize";
/**
 * Main Helper Functions
 */

// Tasks Helper Functioms
const getTasksFromDb = async (userId: number) =>
	Task.findAll({ where: { userId } });

const createTaskInDb = async (taskObj: TaskInterface): Promise<object> => {
	console.info({ "creatingTask--->": taskObj });

	const { taskName, taskDetail, attachment, userId, completionTime } = taskObj;
	taskObj.taskStatus = "PENDING";

	return Task.create({
		taskName,
		taskDetail,
		attachment,
		userId,
		taskStatus: taskObj.taskStatus,
		completionTime,
	});
};

// Task By Id Helper functions
const getSepecificTaskFromDb = async (inputObj: taskByIdInterface) => {
	console.info({ getTaskById: inputObj });

	const { userId, taskId } = inputObj;

	return Task.findOne({ where: { userId, taskId } });
};

const updateTaskInDb = async (
	taskUpdateInputObject: any,
	inputObj: taskByIdInterface
) => {
	let updateobject: any = {};
	const { userId, taskId } = inputObj;

	Object.entries(taskUpdateInputObject).forEach(([key, value]) => {
		console.info({ key, value });
		if (value) updateobject[key] = value;
	});

	// updateobject.updatedAt = "2022-04-17T00:00:00.000Z";

	if (Object.entries(updateobject).length > 0) {
		console.info({ updateobject });
		return Task.update(updateobject, {
			where: { userId, taskId },
		});
	}
};

const deleteTaskFromDb = async (inputObj: any) => {
	console.info({ deleteTaskById: inputObj });
	const { userId, taskId } = inputObj;
	return Task.destroy({
		where: { userId, taskId },
	});
};

const getDelayedTasks = async (userId: number) => {
	return Task.findAll({
		where: {
			userId,
			updatedAt: {
				[Op.gte]: col("completionTime"),
			},
		},
	});
};

export {
	createTaskInDb,
	getTasksFromDb,
	getSepecificTaskFromDb,
	updateTaskInDb,
	deleteTaskFromDb,
	getDelayedTasks,
};
