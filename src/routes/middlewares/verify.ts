import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { getUserByEmail } from "../../services/user.service";

export const verify = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;
		const tokenFromHeaders: any = authorization || null;

		if (tokenFromHeaders) {
			let token: string = tokenFromHeaders.split(" ")[1];
			let decoded: any = jwt.verify(token, process.env.SECRET || "test");

			console.info({ decoded });

			res.locals.userId = decoded?.userId;
			res.locals.role = decoded?.role;
			next();
		} else {
			res
				.status(400)
				.json({ message: "No Authorization token provided in request" });
		}
		// }
	} catch (err) {
		console.error({ err });
		res.status(401).json({ message: "Couldnt Authenticate" });
	}
};
