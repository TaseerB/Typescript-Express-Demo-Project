import { Express, Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

export = (app: Express) => {};
