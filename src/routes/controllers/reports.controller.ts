import { Request, Response } from "express";
import {
	getTasksStats,
	formatTasksStats,
} from "../../services/reports.service";
import { TasksActivityCountInterface } from "../../db/models/interfaces";
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

	const countOfTasksPerDay = await formatTasksStats(inputObject);

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

	const tasksAfterDueTime = await formatTasksStats(inputObject);

	res.status(200).json({ tasksAfterDueTime });
};
