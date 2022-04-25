import request from "supertest";
import { createServer } from "../src/utils/server";
import Hashids from "hashids";
// import * as userServices from "../src/services/user.service";

const secretSalt = process?.env?.SECRETENCODETEXT;

import { encodeIds, decodeIds } from "../src/services/common.service";

let app = createServer();

describe("check encoded ids", () => {
	it("check encoded decoded ids", () => {
		const hashids = new Hashids(secretSalt, 5);
		const obj = { dataValues: { testId: 10 } };
		const encodedId = hashids.encode(10);
		const decodedId = hashids.decode(encodedId);

		console.info({ encodedId, did: decodedId[0] });

		encodeIds(obj);

		expect(obj.dataValues.testId).toEqual(encodedId);

		const getdecid = decodeIds(obj.dataValues.testId);

		expect(getdecid).toEqual(decodedId[0]);
	});
});

describe("GET /users", () => {
	describe("get users", () => {
		it("get list of users", async () => {
			// const spy = jest
			// 	.spyOn(userServices, "getUsersFromDb")
			// 	.mockResolvedValueOnce([]);
			// console.info({ spy });
			const users = await request(app)
				.get("/users")
				.set("Accept", "application/json");
			// expect(users).toEqual([]);
			expect(users.status).toEqual(200);
			// spy.mockRestore();
			// expect(spy).toHaveBeenCalledTimes(1);
			// return;
		});
	});
});
