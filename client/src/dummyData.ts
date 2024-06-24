import { Board, Card, Columns } from "./types";

export const sortingCards: Card[] = [
	{
		id: 1,
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
		id: 2,
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
		id: 3,
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
		id: 4,
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
		id: 5,
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
		id: 6,
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
		id: 7,
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
		id: 8,
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

export const newCard: Card = {
	id: 0,
	cardName: "Create New Card",
	creationDate: new Date(),
	order: 0,
	column: Columns.backlog,
	details: {
		checklist: [],
		notes: "",
		timeEstimate: 0,
	},
};

// export const sortingAlgorithmBoard: Board = {
// 	name: "Sorting Algorithms",
// 	cards: sortingCards,
// };

// export const anotherDummyBoard: Board = {
// 	name: "Dummy Board",
// 	cards: [],
// };

// export const emptyBoard: Board = {
// 	name: "Add New Board",
// 	cards: [],
// };
