import Task from "../../models/task";
import { TaskInterface } from "../../models/interfaces";

const createTask = async (taskObj: TaskInterface): Promise<object> => {
	console.info({ "creatingTask--->": taskObj });

	const { taskName, taskDetail, attachment, userId } = taskObj;

	return Task.create({ taskName, taskDetail, attachment, userId });
};

const getTasks = async (userId: any): Promise<object> =>
	Task.findAll({ where: { userId } });

export { createTask, getTasks };
