import { Request, Response } from "express";
import {
	getTasksStats,
	getFormatTasksStats,
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

	const result = await Promise.all(promises);

	console.info({ result });

	const [completedTasksCount, pendingTasksCount] = result;
	const totalTasksCount = pendingTasksCount + completedTasksCount;

	const tasksCountObject: TasksActivityCountInterface = {
		totalTasksCount,
		pendingTasksCount,
		completedTasksCount,
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
	const { userId } = res.locals;
	console.info({ "GetStatsforSingleDayMostCompletion--->": userId });

	const inputObject: any = {
		userId,
		taskStatus: "COMPLETED",
		dueFlag: false,
	};

	const countOfTasksPerDay = await getFormatTasksStats(inputObject);
	let max = 0;

	const countOfSingleDay = countOfTasksPerDay.filter((t: any) => {
		console.info({ max, tcount: t.tasksCount });
		if (t.tasksCount > max) {
			max = t.tasksCount;
			return t;
		}
	});

	countOfTasksPerDay;

	res.status(200).json({
		mostInSingleDay: {
			day: countOfSingleDay[0].day,
			tasksCompleted: countOfSingleDay[0].tasksCount,
		},
	});
};
