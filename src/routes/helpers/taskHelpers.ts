import Task from "../../models/task";
import { TaskInterface } from "../../models/interfaces";
import { taskByIdInterface } from "../../models/interfaces";

/**
 * Main Helper Functions
 */

// Tasks Helper Functioms
const getTasks = async (userId: any): Promise<object> =>
	Task.findAll({ where: { userId } });

const createTask = async (taskObj: TaskInterface): Promise<object> => {
	console.info({ "creatingTask--->": taskObj });

	const { taskName, taskDetail, attachment, userId } = taskObj;

	return Task.create({ taskName, taskDetail, attachment, userId });
};

// Task By Id Helper functions
const getTaskById = async (inputObj: taskByIdInterface) => {
	console.info({ getTaskById: inputObj });

	const { userId, taskId } = inputObj;

	return Task.findOne({ where: { userId, taskId } });
};

const updateTaskBydId = async (
	taskUpdateInputObject: any,
	inputObj: taskByIdInterface
) => {
	let updateobject: any = {};
	const { userId, taskId } = inputObj;

	Object.entries(taskUpdateInputObject).forEach(([key, value]) => {
		console.info({ key, value });
		if (value) updateobject[key] = value;
	});

	console.info({ updateobject });

	if (Object.entries(updateobject).length > 0) {
		console.info({ updateobject });
		return Task.update(updateobject, {
			where: { userId, taskId },
		});
	}
};

const deleteTaskById = async (inputObj: any) => {
	console.info({ deleteTaskById: inputObj });
	const { userId, taskId } = inputObj;
	return Task.destroy({
		where: { userId, taskId },
	});
};

export { createTask, getTasks, getTaskById, updateTaskBydId, deleteTaskById };
