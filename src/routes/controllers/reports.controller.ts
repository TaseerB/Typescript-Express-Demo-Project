import { Request, Response } from "express";
import { getTasksStats } from "../../services/reports.service";

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

	// const getPendingTasksCount = await getTasksStats(inpuObject);

	const totalTasksCount = pendingTasksCount + completedTasksCount;

	res.status(200).json({
		tasksCount: {
			totalTasksCount,
			completedTasksCount,
			pendingTasksCount,
		},
	});
	return;
};
