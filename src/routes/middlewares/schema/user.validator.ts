import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// const getSchema

export const validateLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const loginSchema = Joi.object({
			email: Joi.string().email().lowercase().required(),
			password: Joi.string().min(5).required(),
		});

		console.info({ path: req?.url });

		await loginSchema.validateAsync(req.body);

		console.info("--- Scehema Verified----");

		next();
	} catch (err) {
		res.json({ err });
	}
};

export const validateSignUp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const signUpSchema = Joi.object({
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			role: Joi.string()
				.required()
				.regex(/^admin|user$/),
			state: Joi.string()
				.required()
				.regex(/^UN-VERIFIED|VERIFIED$/),
			email: Joi.string().email().lowercase().required(),
			password: Joi.string().min(5).required(),
		});

		console.info({ path: req?.url });

		await signUpSchema.validateAsync(req.body);

		console.info("--- Scehema Verified----");

		next();
	} catch (err) {
		res.json({ err });
	}
};

export const valdiateResetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const resetPasswordSchema = Joi.object({
			email: Joi.string().email().lowercase().required(),
		});

		console.info({ path: req?.url });

		await resetPasswordSchema.validateAsync(req.body);

		console.info("--- Scehema Verified----");

		next();
	} catch (err) {
		res.json({ err });
	}
};
