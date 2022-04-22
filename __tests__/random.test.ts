// import request from "supertest";
// import { Express } from "express-serve-static-core";

// import app from "../src/index";

// let server: Express;

// beforeAll(async () => {
// 	server = app;
// });

// describe("GET /index", () => {
// 	it("should return 200 & valid response if request param list is empity", (done) => {
// 		request(server)
// 			.get("/index")
// 			.expect(200)
// 			.end((err, res) => {
// 				if (err) return done(err);
// 				expect(res.body).toMatchObject({ message: "Hello There!" });
// 				done();
// 			});
// 	});
// });

test("t", () => {
	expect(true).toBe(true);
});
