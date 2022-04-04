import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import user from "./routes/user/users";
import login from "./routes/user/login";
import tasks from "./routes/tasks/tasks";
import * as dotenv from "dotenv";
import sequelize from "./config/db";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// const { env } = process;
// const PORT = process.env.PORT;
const port = process.env.PORT;

user(app);
login(app);
tasks(app);

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
