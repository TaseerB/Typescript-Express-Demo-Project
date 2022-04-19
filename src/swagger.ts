export default {
	swagger: "2.0",
	info: {
		version: "1.0.0",
		title: "TYPESCRIPT-EXPRESS-DEMO-PROJECT",
		description: "Typescript Express API Project",
		license: {
			name: "MIT",
			url: "https://opensource.org/licenses/MIT",
		},
	},
	host: "localhost:3000",
	basePath: "/",
	tags: [
		{
			name: "Users",
			description: "API for users in the system",
		},
		{
			name: "Tasks",
			description: "API for tasks description in the system",
		},
		{
			name: "TasksByID",
			description: "API for tasks by id ",
		},
	],
	schemes: ["http"],
	consumes: ["application/json"],
	produces: ["application/json"],
	paths: {
		"/users": {
			get: {
				tags: ["Users"],
				summary: "Get all users in system",
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Users",
						},
					},
				},
			},
			post: {
				tags: ["Users"],
				summary: "Create new user in system",
				parameters: [
					{
						name: "user",
						in: "body",
						description: "User that we want to create",
						schema: {
							$ref: "#/definitions/User",
						},
					},
				],
				produces: ["application/json"],
				responses: {
					"200": {
						description: "New user is created",
						schema: {
							$ref: "#/definitions/User",
						},
					},
				},
			},
		},
		"/password-reset": {
			post: {
				tags: ["Users"],
				summary: "To Reset Password for a user",
				parameters: [
					{
						name: "email",
						in: "body",
						description: "Reset password for a particular User",
						required: true,
						schema: {
							$ref: "#/definitions/PasswordReset",
						},
					},
				],
				produces: ["application/json"],
				responses: {
					"200": {
						description: "reset email sent sucessfully",
					},
				},
			},
		},
		"/tasks": {
			get: {
				tags: ["Tasks"],
				summary: "Get all tasks for a particular user",
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Tasks",
						},
					},
				},
			},
			post: {
				tags: ["Tasks"],
				summary: "Create new task for a particular user in system",
				parameters: [
					{
						name: "task",
						in: "body",
						description: "Creation of task for a particular user",
						schema: {
							$ref: "#/definitions/Task",
						},
					},
				],
				produces: ["application/json"],
				responses: {
					"200": {
						description: "New Task is created",
						schema: {
							$ref: "#/definitions/Task",
						},
					},
				},
			},
		},
		"/tasks/{id}": {
			get: {
				tags: ["TasksByID"],
				description: "Returns tasks based on ID",
				summary: "Find tasks by ID",
				operationId: "gettasksById",
				produces: ["application/json"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID of pet to use",
						required: true,
						type: "integer",
					},
				],
				responses: {
					"200": {
						description: "task response",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/TaskByID",
							},
						},
					},
				},
			},
			put: {
				tags: ["TasksByID"],
				description: "Updates task based on ID",
				summary: "Updates any task value provided in input",
				operationId: "puttasksById",
				produces: ["application/json"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID of pet to use",
						required: true,
						type: "integer",
					},
					{
						name: "taskbyid",
						in: "body",
						description: "Parameters provided for update",
						schema: {
							$ref: "#/definitions/TaskByID",
						},
					},
				],
				responses: {
					"200": {
						description: "task updated successfully",
					},
				},
			},
			delete: {
				tags: ["TasksByID"],
				description: "Deletes task based on ID",
				summary: "Deletes tasks by ID",
				operationId: "deletetasksById",
				produces: ["application/json"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID of pet to use",
						required: true,
						type: "integer",
					},
				],
				responses: {
					"200": {
						description: "task deleted ",
					},
				},
			},
		},
	},
	definitions: {
		User: {
			required: [
				"firstName",
				"lastName",
				"email",
				"password",
				"state",
				"authType",
				"role",
			],
			properties: {
				firstName: { type: "string", required: true },
				lastName: { type: "string", required: true },
				email: { type: "string", required: true },
				password: { type: "string", format: "password", required: true },
				state: { type: "string", enum: ["UN-VERIFIED", "VERIFIED"] },
				role: { type: "string", enum: ["admin", "user"] },
				authType: { type: "string", enum: ["system", "google"] },
			},
		},
		Users: {
			type: "array",
			$ref: "#/definitions/User",
		},
		PasswordReset: {
			required: ["email"],
			properties: {
				email: {
					type: "string",
					required: true,
					example: "samuelabab@yopmail.com",
				},
			},
		},
		Task: {
			required: ["taskName", "taskDetail", "completionTime"],
			properties: {
				taskName: { type: "string", required: true, example: "Work" },
				taskDetail: {
					type: "string",
					required: true,
					example: "3 Hours a day",
				},
				attachment: { type: "string", required: false },
				completionTime: { type: "string", required: true, format: "date-time" },
			},
		},
		Tasks: {
			type: "array",
			$ref: "#/definitions/User",
		},
		TaskByID: {
			required: [
				"taskId",
				"taskName",
				"taskDetail",
				"attachment",
				"taskStatus",
				"completionTime",
				"createdAt",
				"updatedAt",
				"userId",
			],
			properties: {
				taskId: { type: "integer", example: 1 },
				taskName: { type: "string", example: "Work" },
				taskDetail: { type: "string", example: "7 Hours a day" },
				attachment: { type: "string" },
				taskStatus: { type: "string", example: "PENDING" },
				completionTime: {
					type: "string",
					example: "2022-04-19T19:45:35.000Z",
					format: "date-time",
				},
				createdAt: {
					type: "string",
					example: "2022-04-19T12:47:14.000Z",
					format: "date-time",
				},
				updatedAt: {
					type: "string",
					example: "2022-04-19T19:45:35.000Z",
					format: "date-time",
				},
				userId: { type: "integer", example: 1 },
			},
		},
	},
};
