import { Board, Card, Columns } from "./types";

export const sortingCards: Card[] = [
	{
		cardId: "card-001",
		cardName: "Merge Sort",
		creationDate: new Date("2024-06-10T12:00:00"),
		order: 0,
		column: Columns.inProgress,
		details: {
			checklist: [
				{ checked: false, value: "YouTube Resource" },
				{ checked: false, value: "Blog Post Walkthrough" },
				{ checked: true, value: "LeetCode Problem" },
			],
			notes:
				"Review the Merge Sort algorithm and solve the problem on LeetCode.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-002",
		cardName: "Heap Sort",
		creationDate: new Date("2024-06-09T10:00:00"),
		order: 2,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Read Theory" },
				{ checked: false, value: "YouTube Visualization" },
			],
			notes: "Understand the heap structure and how it works in sorting.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-003",
		cardName: "Quick Sort",
		creationDate: new Date("2024-06-08T11:00:00"),
		order: 1,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Blog Explanation" },
				{ checked: false, value: "Implement in Python" },
			],
			notes: "Review partitioning logic and implement Quick Sort in Python.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-004",
		cardName: "Sorting Basics",
		creationDate: new Date("2024-06-07T09:30:00"),
		order: 0,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Introduction Video" },
				{ checked: true, value: "Key Concepts Summary" },
			],
			notes:
				"Reviewed basic concepts and terminology used in sorting algorithms.",
			timeEstimate: 60,
		},
	},
	{
		cardId: "card-005",
		cardName: "Bubble Sort",
		creationDate: new Date("2024-06-06T08:45:00"),
		order: 1,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Step-by-step Guide" },
				{ checked: true, value: "Optimization Techniques" },
			],
			notes: "Learn the naive approach and how to optimize it.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-006",
		cardName: "Insertion Sort",
		creationDate: new Date("2024-06-05T07:55:00"),
		order: 2,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Tutorial Video" },
				{ checked: true, value: "Practical Examples" },
			],
			notes: "Reviewed insertion sort mechanics and practiced with examples.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-007",
		cardName: "Comparing Algorithms",
		creationDate: new Date("2024-06-04T06:50:00"),
		order: 3,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Compare Performance" },
				{ checked: false, value: "Complexity Analysis" },
			],
			notes:
				"Analyze and compare the time and space complexity of different sorting algorithms.",
			timeEstimate: 120,
		},
	},
	{
		cardId: "card-008",
		cardName: "Space Complexity",
		creationDate: new Date("2024-06-03T05:45:00"),
		order: 0,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Study Memory Usage" },
				{ checked: false, value: "Optimization Strategies" },
			],
			notes: "Learn how to minimize space usage in sorting algorithms.",
			timeEstimate: 120,
		},
	},
];

export const sortingAlgorithmBoard: Board = {
	boardId: "board-001",
	boardName: "Sorting Algorithms",
	cards: sortingCards,
};

export const anotherDummyBoard: Board = {
	boardId: "board-002",
	boardName: "Dummy Board",
	cards: [],
};
