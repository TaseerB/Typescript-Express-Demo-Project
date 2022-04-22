import { encodeIds } from "../src/services/common.service";
import Hashids from "hashids";
import dotenv from "dotenv";

dotenv.config();

const secretSalt = process?.env?.SECRETENCODETEXT;

describe("Testing ids to be encoded", () => {
	test("if key contains keyword id it should pass", () => {
		let obj: any = {
			dataValues: { testId: 1 },
		};

		let hashids = new Hashids(secretSalt, 5);

		let hashedId = hashids.encode(obj.dataValues.testId);

		encodeIds(obj);

		expect(obj.dataValues.testId).toBe(hashedId);
	});
});
