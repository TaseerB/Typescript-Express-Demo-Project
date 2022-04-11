import { Request, Response, Express } from "express";
import { customRequest } from "../../db/models/requestModel";
import {
	getTasksFromDb,
	createTaskInDb,
	getSepecificTaskFromDb,
	updateTaskInDb,
	deleteTaskFromDb,
} from "../../services/taskHelpers";

export const getTasks = async (req: Request, res: Response) => {
	console.info("tasks");
	const { userId } = res.locals;

	try {
		console.info({ userId });

		const tasks = await getTasksFromDb(userId);

		console.info({ tasks });

		res.status(200).json({ message: tasks });

		return;
	} catch (e) {
		console.error({ e });
		res.status(500).json({ message: e });

		return;
	}
};

export const createTask = async (req: Request, res: Response) => {
	const { userId } = res.locals;
	req.body.userId = userId;

	const task = await createTaskInDb(req.body);

	res.json({ message: task });
};

// Task By Id Logical Functions

export const getTaskById = async (req: customRequest, res: Response) => {
	const taskByIdInput: any = req.taskByIdInput;

	console.info({ taskByIdInput });

	const task = await getSepecificTaskFromDb(taskByIdInput);

	if (task) {
		res.status(200).json({ message: { task } });
		return;
	}

	res
		.status(400)
		.json({ message: "Invalid Task Id or Invalid User Id provided" });

	return;

	// Get Tasks for Particular User
};

export const editTaskById = async (req: customRequest, res: Response) => {
	const taskByIdInput: any = req.taskByIdInput;
	const propertiesToUpdate: any = req.body;

	const updatedTaskObject: any = await updateTaskInDb(
		propertiesToUpdate,
		taskByIdInput
	);

	console.info({ check: updatedTaskObject[0] });

	if (updatedTaskObject[0]) {
		res.status(200).json({ message: `Task Updated Successfully` });
		return;
	}

	res.status(400).json({ message: "No Task Found to Update" });
	return;
};

export const deleteTaskById = async (req: customRequest, res: Response) => {
	const taskByIdInput = req.taskByIdInput;

	const deletedTask: any = await deleteTaskFromDb(taskByIdInput);

	console.info({ deletedTask });
	if (deletedTask[0]) {
		res.status(200).json({ message: `Task Deleted Successfully` });
		return;
	}

	res.status(400).json({ message: "No Task Found to Delete" });
	return;
};
