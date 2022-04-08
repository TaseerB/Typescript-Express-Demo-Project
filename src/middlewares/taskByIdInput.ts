import { Request, Response, NextFunction } from "express";
import { taskByIdInterface } from "../models/interfaces";
import { customRequest } from "../models/requestModel";

export = () => {
	return (req: customRequest, res: Response, next: NextFunction) => {
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
};
