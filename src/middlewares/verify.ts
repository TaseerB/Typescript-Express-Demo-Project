import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { authorization } = req.headers;
			const tokenFromHeaders: string | null = authorization || null;
			const cookie: any = req?.headers?.cookie;

			if (tokenFromHeaders) {
				// If user registered from his own personal email`

				let token: string = tokenFromHeaders.split(" ")[1];
				let decoded: any = jwt.verify(token, process.env.SECRET || "test");

				console.info({ decoded });
				// const user = await User.findOne({ where: { email: decoded?.email } });

				res.locals.userId = decoded?.userId;
				next();
			} else if (cookie) {
				// User Logged in through Google or Facebook

				console.info("Found Cookie");
				console.info({ userId: req?.params });
				res.locals.userId = req?.params;
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
