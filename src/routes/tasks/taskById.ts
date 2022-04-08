import { customRequest } from "../../models/requestModel";
import { Request, Response, Express } from "express";
import verify from "../../middlewares/verify";
// import { taskByIdInterface } from "../../models/interfaces";
import {
	getTaskById,
	updateTaskBydId,
	deleteTaskById,
} from "../helpers/taskHelpers";
import taskByIdInput from "../../middlewares/taskByIdInput";

export = (app: Express) => {
	console.info("---- User ----");

	const taskMiddlewareFunctions = [verify(), taskByIdInput()];

	app
		.route("/tasks/:taskId")
		.get(taskMiddlewareFunctions, async (req: customRequest, res: Response) => {
			const taskByIdInput: any = req.taskByIdInput;

			console.info({ taskByIdInput });

			const task = await getTaskById(taskByIdInput);

			if (task) {
				res.status(200).json({ message: { task } });
				return;
			}

			res
				.status(400)
				.json({ message: "Invalid Task Id or Invalid User Id provided" });

			return;

			// Get Tasks for Particular User
		})
		.put(taskMiddlewareFunctions, async (req: customRequest, res: Response) => {
			const taskByIdInput: any = req.taskByIdInput;
			const propertiesToUpdate: any = req.body;

			const updatedTaskObject: any = await updateTaskBydId(
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
		})
		.delete(
			taskMiddlewareFunctions,
			async (req: customRequest, res: Response) => {
				const taskByIdInput = req.taskByIdInput;

				const deletedTask: any = await deleteTaskById(taskByIdInput);

				console.info({ deletedTask });
				if (deletedTask[0]) {
					res.status(200).json({ message: `Task Deleted Successfully` });
					return;
				}

				res.status(400).json({ message: "No Task Found to Delete" });
				return;
			}
		);
};
