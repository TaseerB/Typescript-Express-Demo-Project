import request from "supertest";
import { createServer } from "../src/utils/server";
import * as userServices from "../src/routes/controllers/users.controller";
import { responseObj } from "../utils/test.utils";

let app = createServer();

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

	// describe("GET /users/", () => {
	// 	test("users get should return array of users", async () => {
	// 		let check = jest
	// 			.spyOn(userServices, "getUsers")
	// 			//@ts-ignore
	// 			.mockReturnValue(responseObj);
	// 		// chec;
	// 		const users = await request(app)
	// 			.get("/users")
	// 			.set("Accept", "application/json");

	// 		const usersResponse = JSON.parse(users.text);

	// 		// console.info({ c1: typeof usersResponse, c2: typeof responseObj });

	// 		console.info({ usersResponse });

	// 		expect(usersResponse.response[0]).toEqual(responseObj);
	// 	});
	// });
});
