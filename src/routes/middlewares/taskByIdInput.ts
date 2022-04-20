import { Request, Response, NextFunction } from "express";
import { taskByIdInterface } from "../../db/models/interfaces";
import { customRequest } from "../../db/models/requestModel";

import { decodeIds } from "../../services/common.service";

export const taskByIdInput = (
	req: customRequest,
	res: Response,
	next: NextFunction
) => {
	const { userId } = res.locals;
	const { taskId } = req.params;

	const taskDecodedId = decodeIds(taskId);

	let taskByIdInput: taskByIdInterface = {
		userId,
		taskId: taskDecodedId,
	};

	console.info({ taskByIdInput });

	req.taskByIdInput = taskByIdInput;

	next();
};
