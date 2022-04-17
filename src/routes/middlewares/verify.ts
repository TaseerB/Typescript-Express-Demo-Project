import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../../services/user.service";

export const verify = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userFromGoogle: any = res?.req;
		const userEmailFromGoole: any = userFromGoogle?.user?._json?.email;
		const chechHeaders: any = req;

		// console.info({ headers: chechHeaders });
		const { authorization } = req.headers;
		const tokenFromHeaders: any = authorization || null;

		if (userEmailFromGoole) {
			const getUserId: any = await getUserByEmail(userEmailFromGoole);
			res.locals.userId = getUserId?.dataValues?.userId;
			next();
		} else {
			if (tokenFromHeaders) {
				// If user registered from his own personal email`

				let token: string = tokenFromHeaders.split(" ")[1];
				let decoded: any = jwt.verify(token, process.env.SECRET || "test");

				console.info({ decoded });
				// const user = await User.findOne({ where: { email: decoded?.email } });

				res.locals.userId = decoded?.userId;
				next();
			} else {
				res
					.status(400)
					.json({ message: "No Authorization token provided in request" });
			}
		}
	} catch (err) {
		console.error({ err });
		res.status(401).json({ message: "Couldnt Authenticate" });
	}
};
