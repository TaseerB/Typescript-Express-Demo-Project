import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { authorization } = req.headers;
			const tokenFromHeaders = authorization || null;

			if (tokenFromHeaders) {
				let token = tokenFromHeaders.split(" ")[1];
				let decoded = jwt.verify(token, process.env.SECRET || "test");

				console.info({ decoded });
				res.locals.user = decoded;

				next();
			} else {
				res
					.status(400)
					.json({ message: "No Authorization token provided in request" });
			}
		} catch (err) {
			res.status(401).json({ message: "Couldnt Authenticate" });
		}
	};
};
