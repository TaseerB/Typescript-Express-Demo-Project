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
			// "/registerUser": {
			post: {
				tags: ["Users"],
				description: "Create new user in system",
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
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				email: {
					type: "string",
				},
				password: {
					type: "string",
					format: "password",
				},
				state: {
					type: "string",
					example: "UN-VERIFIED | VERIFIED",
				},
				role: {
					type: "string",
					example: "admin | user",
				},
				authType: {
					type: "string",
					example: "google | system",
				},
				// createdAt: {
				// 	type: "string",
				// 	format: "date-time",
				// },
				// updatedAt: {
				// 	type: "string",
				// 	format: "date-time",
				// },
			},
		},
		Users: {
			type: "array",
			$ref: "#/definitions/User",
		},
	},
};
