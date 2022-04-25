import express from "express";
import bodyParser from "body-parser";
import routes from "../routes/routes";

export const createServer = () => {
	const app = express();
	// Parsing Body Params
	app.use(bodyParser.json());

	// Calling Routes
	app.use(routes);

	return app;
};
