import Task from "../db/models/task";
import { TaskInterface } from "../db/models/interfaces";
import { taskByIdInterface } from "../db/models/interfaces";
import { getTasksFromDb, getDelayedTasks } from "./taskHelpers";
import { days, daysArray } from "../db/models/constants";

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

const formatTasksStats = async (inputObject: any) => {
	const { userId, taskStatus, dueFlag } = inputObject;
	const tasksCompleted: any = [];
	let tasks: any;

	if (dueFlag) {
		tasks = await getDelayedTasks(userId);
	} else {
		tasks = await getTasksFromDb(userId);
	}

	console.info({ tasks });

	tasks.forEach((task: any) => {
		// console.info({ task });
		if (task?.dataValues?.taskStatus === taskStatus) {
			const getCompletionDay = new Date(task?.dataValues?.updatedAt).getDay();

			// console.info({ getCompletionDay, days });
			const getDay = days[getCompletionDay];

			console.info({ getDay });

			if (dueFlag) {
				// Set Tasks which have update date after completion date
			}

			tasksCompleted.push({
				day: getDay,
				taskName: task?.dataValues?.taskName,
				completionTime: task?.dataValues?.updatedAt,
			});
		}
		// userCreationTime
	});

	let countoftasksperday: any = [];
	daysArray.forEach((day) => {
		let count = tasksCompleted.filter((task: any) => task.day === day).length;
		console.info({ count, day });

		countoftasksperday.push({
			day,
			average: count > 0 ? (count / tasks.length).toFixed(3) : 0,
			tasksCount: count,
		});
	});

	return countoftasksperday;
};

export { getTasksStats, formatTasksStats };
