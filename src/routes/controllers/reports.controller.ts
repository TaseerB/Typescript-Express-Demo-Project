import { Request, Response } from "express";
import {
	getTasksStats,
	getFormatTasksStats,
	getSimilarTasks,
} from "../../services/reports.service";
import { TasksActivityCountInterface } from "../../db/models/interfaces";

// Main Controllers
export const tasksStats = async (req: Request, res: Response) => {
	const { userId } = res.locals;
	console.info({ "GetStatsfor--->": userId });
	const promises = [];

	const inpuObject: any = { userId };

	inpuObject.taskStatus = "COMPLETED";
	promises.push(getTasksStats(inpuObject));

	inpuObject.taskStatus = "PENDING";
	promises.push(getTasksStats(inpuObject));

	const result: any = await Promise.all(promises);

	console.info({ result: result });

	const [completedTasksCount, pendingTasksCount] = result;
	const totalTasksCount = pendingTasksCount.count + completedTasksCount.count;

	const tasksCountObject: TasksActivityCountInterface = {
		totalTasksCount,
		pendingTasksCount: pendingTasksCount.count,
		completedTasksCount: completedTasksCount.count,
	};

	res.status(200).json({
		tasksCount: tasksCountObject,
	});
	return;
};

export const tasksCompletion = async (req: Request, res: Response) => {
	const { userId } = res.locals;

	console.info({ "GetStatsfor--->": userId });

	const inputObject: any = {
		userId,
		taskStatus: "COMPLETED",
		dueFlag: false,
	};

	const countOfTasksPerDay = await getFormatTasksStats(inputObject);

	// console.info({ getUser: userCreationTime });

	res.status(200).json({ countOfTasksPerDay });
};

export const tasksCompletedAfterDueTime = async (
	req: Request,
	res: Response
) => {
	const { userId } = res.locals;

	console.info({ "GetStatsforTasksDelayedCompletion--->": userId });

	const inputObject: any = {
		userId,
		taskStatus: "COMPLETED",
		dueFlag: true,
	};

	const tasksAfterDueTime = await getFormatTasksStats(inputObject);

	res.status(200).json({ tasksAfterDueTime });
};

export const tasksCompletionSingleDay = async (req: Request, res: Response) => {
	const { userId } = res?.locals;
	console.info({ "GetStatsforSingleDayMostCompletion--->": userId });

	const inputObject: any = {
		userId,
		taskStatus: "COMPLETED",
		dueFlag: false,
	};

	const countOfTasksPerDay = await getFormatTasksStats(inputObject);
	console.info({ countOfTasksPerDay });

	let countOfSingleDay;
	if (countOfTasksPerDay.length > 0) {
		const max = Math.max(
			...countOfTasksPerDay.map((value: any) => value?.tasksCount)
		);

		const findMax = countOfTasksPerDay
			.map((value: any) => value?.tasksCount)
			.indexOf(max);

		console.info({ findMax, max });
		countOfSingleDay = countOfTasksPerDay[findMax];
	}

	res.status(200).json({
		mostInSingleDay: {
			day: countOfSingleDay?.day,
			tasksCompleted: countOfSingleDay?.tasksCount,
		},
	});
};

export const sameTasks = async (req: Request, res: Response) => {
	const { userId } = res.locals;
	console.info({ "GetStatsforSingleDayMostCompletion--->": userId });

	const retrieveSimilarTasks = await getSimilarTasks(userId);

	res.status(200).json({ retrieveSimilarTasks });
};
