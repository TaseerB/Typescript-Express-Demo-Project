import Task from "../db/models/task";
// import { TaskInterface } from "../db/models/interfaces";
// import { taskByIdInterface } from "../db/models/interfaces";
import {
	getDelayedTasks,
	getCompletedTasks,
	getTasksFromDb,
} from "./tasks.service";
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

const getFormatTasksStats = async (inputObject: any) => {
	const { userId, taskStatus, dueFlag } = inputObject;
	const tasksCompleted: any = [];
	let tasks: any;

	if (dueFlag) {
		tasks = await getDelayedTasks({ userId, taskStatus });
	} else {
		tasks = await getCompletedTasks({ userId, taskStatus });
	}

	console.info({ tasks });

	tasks.forEach((task: any) => {
		const getCompletionDay = new Date(task?.dataValues?.updatedAt).getDay();

		const getDay = days[getCompletionDay];

		tasksCompleted.push({
			day: getDay,
			taskName: task?.dataValues?.taskName,
			completionTime: task?.dataValues?.updatedAt,
		});
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

const getSimilarTasks = async (userId: number) => {
	const tasks: any = await getTasksFromDb(userId);

	const taskDetailsArray = tasks.map(
		(task: any) => task?.taskName + " " + task?.taskDetail
	);
	// // .map((task) => task.taskName);
	const similartTasks = tasks.filter((value: any, index: any) => {
		const check = taskDetailsArray.indexOf(value);
		// console.info({ value, index, check });

		const similarityValueCheck = value?.taskName + " " + value?.taskDetail;

		return taskDetailsArray.indexOf(similarityValueCheck) != index;
	});

	let similarTasks: any[] = [];
	let arr_size = tasks.length;

	for (let i = 0; i < arr_size / 2; i++) {
		let count = 0;
		const itask = tasks[i];
		const isimilarityValueCheck = itask?.taskName + " " + itask?.taskDetail;

		for (let j = i + 1; j < arr_size; j++) {
			const jtask = tasks[j];
			const jsimilarityValueCheck = jtask?.taskName + " " + jtask?.taskDetail;

			if (isimilarityValueCheck === jsimilarityValueCheck) {
				if (count === 0) {
					similarTasks.push(jtask);
					similarTasks.push(jtask);
				} else {
					similarTasks.push(jtask);
				}
				count++;
			}
		}
	}

	// tasks.forEach((task: any, index: any) => {
	// 	const similarityValueCheck = task?.taskName + " " + task?.taskDetail;
	// 	if (taskDetailsArray.indexOf(similarityValueCheck) != index) {
	// 		similarTasks.push(task);
	// 	}
	// });

	console.info({ similarTasks });

	return similarTasks;

	// tasks.forEach((task) => {
	// 	console.info({ words: task?.taskDetail });
	// });
};

// const getPerDayTasksStats;

export { getTasksStats, getFormatTasksStats, getSimilarTasks };
