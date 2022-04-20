// Libraries
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// import cookieSession from "cookie-session";
// import passport from "passport";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

import swaggerDocument from "./swagger";

// Routes
import routes from "./routes/routes";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

// Parsing Body Params
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;
// const cookieKey: any = process?.env?.COOKIEKEY || "someSomeSome";

// Google Based using cookies to store user information
// app.use(
// 	cookieSession({
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 		keys: [cookieKey],
// 	})
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Calling Routes
app.use(routes);

app.use(helmet());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get("/logout", (req: Request, res: Response) => {
	// cron.stop();
	res.send(200).json({ message: "logged out" });
});
