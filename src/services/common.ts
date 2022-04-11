import { Request, Response } from "express";

export const somethingWentWrong = (req: Request, res: Response) => {
	res.status(500).json({ message: "something went Wrong." });
	return;
};
