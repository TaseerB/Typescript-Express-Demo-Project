import { Request, Response, NextFunction } from "express";
import { taskByIdInterface } from "../models/interfaces";

export interface customRequest extends Request {
	user?: any;
	taskByIdInput?: taskByIdInterface;
}
