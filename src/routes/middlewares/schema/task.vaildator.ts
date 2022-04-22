/**
 * taskName, taskDetail, attachment, userId, completionTime
 */
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateTaskCreation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const taskSchema = Joi.object({
			taskName: Joi.string(),
			taskDetail: Joi.string(),
			completionTime: Joi.date(),
			taskStatus: Joi.string()
				.regex(/^PENDING|COMPLETED$/)
				.default("PENDING"),
			attachment: Joi.string().default(null),
		});

		console.info({ path: req?.url });

		await taskSchema.validateAsync(req.body);

		console.info("--- Scehema Verified----");

		next();
	} catch (err) {
		console.error({ err });
		res.json({ err });
	}
};
