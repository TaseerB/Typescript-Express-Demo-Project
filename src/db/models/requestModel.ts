import { Request, Response, NextFunction } from "express";
import { taskByIdInterface } from "./interfaces";

export interface customRequest extends Request {
	user?: any;
	taskByIdInput?: taskByIdInterface;
}
