import Hashids from "hashids";
import dotenv from "dotenv";

dotenv.config();
const secretSalt = process?.env?.SECRETENCODETEXT;

import { encodeIds, decodeIds } from "../src/services/common.service";

describe("check encoded ids", () => {
	it("check encoded decoded ids", () => {
		const hashids = new Hashids(secretSalt, 5);
		const obj = { dataValues: { testId: 10 } };
		const encodedId = hashids.encode(10);
		const decodedId = hashids.decode(encodedId);

		encodeIds(obj);
		expect(obj.dataValues.testId).toEqual(encodedId);

		const getdecid = decodeIds(obj.dataValues.testId);
		expect(getdecid).toEqual(decodedId[0]);
	});
});
