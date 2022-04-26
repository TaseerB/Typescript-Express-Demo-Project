import request from "supertest";
import { createServer } from "../src/utils/server";
import { responseObj, responseArray } from "../utils/test.utils";

let app = createServer();

describe("Users", () => {
	describe("GET /users", () => {
		test("users get should return array of users", async () => {
			const users = await request(app)
				.get("/users")
				.set("Accept", "application/json");
			const usersResponse = JSON.parse(users.text);
			expect(usersResponse.response[0]).toEqual(responseObj);
		});
	});

	describe("POST /login", () => {
		test("successfull verification should generate token", async () => {
			const token = await request(app)
				.post("/login")
				.send({
					email: "",
					password: "",
				})
				.set("Accept", "application/json");

			const getToken = JSON.parse(token.text);
			console.info({ check: getToken?.token });

			expect(getToken?.token).toBeTruthy();
		});
	});

	describe("GET /tasks", () => {
		test("tasks should throw exception", async () => {
			const tasks = await request(app).get("/tasks");
			const tasksResp = JSON.parse(tasks.text);

			expect(tasksResp).toEqual({
				message: "No Authorization token provided in request",
			});
			// expect(usersResponse.response[0]).toEqual(responseObj);
		});
	});

	describe("GET /tasks", () => {
		test("tasks should give a response with bearer token", async () => {
			const tasks = await request(app).get("/tasks").set({
				Authorization: "bearer ",
			});
			const tasksResp = JSON.parse(tasks.text);

			console.info({ check: tasksResp.message });

			expect(tasksResp.message[0]).toEqual({
				attachment: "uploads/1_2022-04-14T09:38:33.774Z_test.odt",
				completionTime: "2022-04-12T00:00:00.000Z",
				createdAt: "2022-04-14T19:03:43.000Z",
				taskDetail: "0 times a day",
				taskId: "Lv4xv",
				taskName: "Sing",
				taskStatus: "COMPLETED",
				updatedAt: "2022-04-14T19:04:48.000Z",
			});
			// expect(usersResponse.response[0]).toEqual(responseObj);
		});
	});
});
