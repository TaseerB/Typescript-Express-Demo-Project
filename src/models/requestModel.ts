import { Request, Response, NextFunction } from "express";

export interface customRequest extends Request {
	user: any;
}
