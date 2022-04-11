import { Request, Response, NextFunction } from "express";
import { taskByIdInterface } from "../../db/models/interfaces";
import { customRequest } from "../../db/models/requestModel";

export const taskByIdInput = (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	const { userId } = res.locals;
	const { taskId } = req.params;
	const taskIDInt = parseInt(taskId, 10);
	let taskByIdInput: taskByIdInterface = {
		userId,
		taskId: taskIDInt,
	};

	console.info({ taskByIdInput });

	req.taskByIdInput = taskByIdInput;

	next();
};
