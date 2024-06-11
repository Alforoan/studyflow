export type Board = {
	boardId: string;
	boardName: string;
	cards?: Card[];
};

export type Card = {
	cardId: string;
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
