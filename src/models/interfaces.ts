/**
 * Making Interfaces for generic use throughout the app
 */

export interface UserInterface {
	role: "admin" | "user";
	firstName: string;
	lastName: string;
	email: string;
	password: string | null;
	state: "verified" | "un-verified";
}

export interface TaskInterface {
	userId: Number;
	taskName: string;
	taskDetail: string | null;
	attachment: string | null;
}
