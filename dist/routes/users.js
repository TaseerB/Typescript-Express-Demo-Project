"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app
    .route("/users")
    .get((req, res) => {
    console.info({ req, res });
    res.send("Get All Users");
})
    .post((req, res) => {
    console.info({ req, res });
    res.send("Create User");
});
exports.default = app;
