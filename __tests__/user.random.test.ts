// import * as userServices from "../src/services/user.service";
import * as userServices from "../src/routes/controllers/users.controller";
import { createServer } from "../src/utils/server";
import request from "supertest";
let app = createServer();

let responseObj = {
	userId: "Lv4xv",
	role: "admin",
	firstName: "abc",
	lastName: "tkom",
	email: "abctkom@yopmail.com",
	state: "VERIFIED",
	authType: "system",
	createdAt: "2022-04-14T11:25:32.000Z",
	updatedAt: "2022-04-14T11:26:06.000Z",
};

describe("Users", () => {
	describe("GET /users", () => {
		test("users get should return array of users", async () => {
			let check = jest
				.spyOn(userServices, "getUsers")
				//@ts-ignore
				.mockReturnValue(responseObj);
			// chec;
			const users = await request(app)
				.get("/users")
				.set("Accept", "application/json");

			const usersResponse = JSON.parse(users.text);

			// console.info({ c1: typeof usersResponse, c2: typeof responseObj });

			console.info({ usersResponse });

			expect(usersResponse.response[0]).toEqual(responseObj);
		});
	});
});
