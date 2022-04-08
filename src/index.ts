import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

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

// Handling Routes
user(app);
login(app);
tasks(app);
verify(app);
googleAuth(app);
taskById(app);
// passportUser;

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
