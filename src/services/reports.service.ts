import Task from "../db/models/task";
import { TaskInterface } from "../db/models/interfaces";
import { taskByIdInterface } from "../db/models/interfaces";

const getTasksStats = async (inputObj: any) => {
	const { userId, taskStatus } = inputObj;
	const { count, rows } = await Task.findAndCountAll({
		where: {
			userId,
			taskStatus,
		},
		// offset: 10,
		// limit: 2,
	});
	console.log(count);
	console.log(rows);

	return count;
};

export { getTasksStats };
