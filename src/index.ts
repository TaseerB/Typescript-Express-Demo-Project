// Libraries
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import { createServer } from "./utils/server";
import swaggerDocument from "./swagger";

// Routes

import * as dotenv from "dotenv";
dotenv.config();

let app = createServer();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;
// const cookieKey: any = process?.env?.COOKIEKEY || "someSomeSome";

app.use(helmet());

app.get("/index", (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello There!" });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get("/logout", (req: Request, res: Response) => {
	// cron.stop();
	res.status(200).json({ message: "logged out" });
});
