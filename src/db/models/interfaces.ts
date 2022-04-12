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
	authType: "system" | "google";
}

export interface TaskInterface {
	userId: number;
	taskName: string;
	taskDetail: string | null;
	attachment: string | null;
	taskStatus: "COMPLETED" | "PENDING";
	completionTime: Date;
}

export interface taskByIdInterface {
	taskId: number;
	userId: number;
}

export interface TasksActivityCountInterface {
	totalTasksCount: number;
	pendingTasksCount: number;
	completedTasksCount: number;
}
