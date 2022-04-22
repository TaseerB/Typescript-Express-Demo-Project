// Libraries
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import swaggerDocument from "./swagger";

// Routes
import routes from "./routes/routes";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
export default app;

// Parsing Body Params
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;
// const cookieKey: any = process?.env?.COOKIEKEY || "someSomeSome";

// Calling Routes
app.use(routes);

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
