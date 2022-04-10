// Libraries
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";
import passport from "passport";

// Routes
import user from "./routes/user/users";
import login from "./routes/user/login";
import tasks from "./routes/tasks/tasks";
import taskById from "./routes/tasks/taskById";
import verify from "./routes/user/verify";
import googleAuth from "./routes/user/googleAuth";
// import sequelize from "./config/db";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT;
const cookieKey: any = process?.env?.COOKIEKEY || "someSomeSome";

// Handling Routes
user(app);
login(app);
tasks(app);
verify(app);
googleAuth(app);
taskById(app);
// passportUser

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

// app.get("/logout", (req: Request, res: Response) => {
// 	(async () => {
// 		await sequelize.close();
// 	})();
// 	res.send("Logged out user and connection closed");
// });

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
