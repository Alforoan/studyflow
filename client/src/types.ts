export type Board = {
	id?: number;
	uuid: string;
	name: string;
	cards?: Card[];
};

export type Card = {
	id: number;
	cardName: string;
	creationDate: Date;
	order: number;
	column: Columns;
	details: CardDetails;
};

export type CardDetails = {
	checklist?: ChecklistEntry[];
	notes?: string;
	timeEstimate?: number;
};

export type ChecklistEntry = {
	checked: boolean;
	value: string;
};

export enum Columns {
	backlog = "Backlog",
	inProgress = "In Progress",
	completed = "Completed",
}
