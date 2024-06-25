import { Card, Columns } from "./types";

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
		order: 3,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Read Theory" },
				{ checked: false, value: "YouTube Visualization" },
			],
			notes: "Understand the heap structure and how it works in sorting.",
			timeEstimate: 150,
		},
	},
	{
		id: 3,
		cardName: "Quick Sort",
		creationDate: new Date("2024-06-08T11:00:00"),
		order: 2,
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
			timeEstimate: 90,
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
			timeEstimate: 180,
		},
	},
	{
		id: 7,
		cardName: "Comparing Algorithms",
		creationDate: new Date("2024-06-04T06:50:00"),
		order: 4,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Compare Performance" },
				{ checked: false, value: "Complexity Analysis" },
			],
			notes:
				"Analyze and compare the time and space complexity of different sorting algorithms.",
			timeEstimate: 60,
		},
	},
	{
		id: 8,
		cardName: "Space Complexity",
		creationDate: new Date("2024-06-03T05:45:00"),
		order: 1,
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

export const databaseCards = [
	{
		id: 9,
		cardName: "Database Optimization",
		creationDate: new Date("2024-06-10T09:00:00"),
		order: 0,
		column: Columns.inProgress,
		details: {
			checklist: [
				{ checked: false, value: "Read about query optimization" },
				{ checked: false, value: "Implement indexing" },
			],
			notes:
				"Focus on techniques to improve database performance and efficiency.",
			timeEstimate: 210,
		},
	},
	{
		id: 10,
		cardName: "NoSQL Databases",
		creationDate: new Date("2024-06-10T08:30:00"),
		order: 1,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Study MongoDB" },
				{ checked: false, value: "Explore Redis" },
			],
			notes: "Compare different NoSQL databases and their use cases.",
			timeEstimate: 120,
		},
	},
	{
		id: 11,
		cardName: "ACID Properties",
		creationDate: new Date("2024-06-10T08:00:00"),
		order: 2,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Atomicity concept" },
				{ checked: false, value: "Study isolation levels" },
			],
			notes:
				"Ensure understanding of transactional integrity within database systems.",
			timeEstimate: 100,
		},
	},
	{
		id: 12,
		cardName: "SQL Transactions",
		creationDate: new Date("2024-06-09T12:00:00"),
		order: 3,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Practice with BEGIN, COMMIT, ROLLBACK" },
				{ checked: false, value: "Error handling in transactions" },
			],
			notes: "Master the basics of managing SQL transactions.",
			timeEstimate: 150,
		},
	},
	{
		id: 13,
		cardName: "Database Scaling",
		creationDate: new Date("2024-06-09T11:00:00"),
		order: 0,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Study sharding techniques" },
				{ checked: true, value: "Replication strategies" },
			],
			notes: "Understand how to scale databases horizontally and vertically.",
			timeEstimate: 180,
		},
	},
	{
		id: 14,
		cardName: "Backup Strategies",
		creationDate: new Date("2024-06-09T10:00:00"),
		order: 1,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Implement periodic backups" },
				{ checked: true, value: "Test recovery process" },
			],
			notes:
				"Ensure data integrity through reliable backup and recovery processes.",
			timeEstimate: 70,
		},
	},
];

export const webDevCards = [
	{
		id: 15,
		cardName: "Responsive Design",
		creationDate: new Date("2024-06-12T10:00:00"),
		order: 0,
		column: Columns.inProgress,
		details: {
			checklist: [
				{ checked: false, value: "Learn CSS Grid" },
				{ checked: false, value: "Explore Media Queries" },
			],
			notes: "Implement responsive web designs that work on any device.",
			timeEstimate: 120,
		},
	},
	{
		id: 16,
		cardName: "React Hooks",
		creationDate: new Date("2024-06-11T09:00:00"),
		order: 1,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "UseState basics" },
				{ checked: false, value: "UseEffect in depth" },
			],
			notes:
				"Master the fundamentals of React Hooks to manage state and side effects.",
			timeEstimate: 100,
		},
	},
	{
		id: 17,
		cardName: "API Integration",
		creationDate: new Date("2024-06-11T11:30:00"),
		order: 2,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Fetch API data" },
				{ checked: false, value: "Handle async operations" },
			],
			notes:
				"Learn to connect your applications to external APIs for real-time data.",
			timeEstimate: 150,
		},
	},
	{
		id: 18,
		cardName: "Security Best Practices",
		creationDate: new Date("2024-06-11T08:20:00"),
		order: 3,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Implement HTTPS" },
				{ checked: false, value: "Sanitize user input" },
			],
			notes:
				"Ensure web application security by following industry-standard practices.",
			timeEstimate: 90,
		},
	},
	{
		id: 19,
		cardName: "CSS Animations",
		creationDate: new Date("2024-06-10T14:15:00"),
		order: 0,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Keyframes" },
				{ checked: true, value: "Transition vs Animation" },
			],
			notes: "Create engaging and smooth animations using CSS.",
			timeEstimate: 70,
		},
	},
];

export const mobileAppCards = [
	{
		id: 20,
		cardName: "Swift Fundamentals",
		creationDate: new Date("2024-06-13T12:30:00"),
		order: 0,
		column: Columns.inProgress,
		details: {
			checklist: [
				{ checked: false, value: "Basic Syntax" },
				{ checked: false, value: "Control Flows" },
			],
			notes: "Grasp the basics of Swift programming for iOS development.",
			timeEstimate: 180,
		},
	},
	{
		id: 21,
		cardName: "Android Architecture",
		creationDate: new Date("2024-06-13T10:15:00"),
		order: 1,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Learn MVVM" },
				{ checked: false, value: "Explore LiveData" },
			],
			notes: "Understand the architectural components of Android applications.",
			timeEstimate: 160,
		},
	},
	{
		id: 22,
		cardName: "React Native",
		creationDate: new Date("2024-06-12T15:00:00"),
		order: 2,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Setup environment" },
				{ checked: false, value: "Build first app" },
			],
			notes: "Develop cross-platform mobile apps with React Native.",
			timeEstimate: 130,
		},
	},
	{
		id: 23,
		cardName: "Flutter for iOS and Android",
		creationDate: new Date("2024-06-12T13:40:00"),
		order: 3,
		column: Columns.backlog,
		details: {
			checklist: [
				{ checked: false, value: "Understand Widgets" },
				{ checked: false, value: "State Management" },
			],
			notes:
				"Learn how to build beautiful, natively compiled applications for mobile from a single codebase.",
			timeEstimate: 120,
		},
	},
	{
		id: 24,
		cardName: "Mobile UX Design",
		creationDate: new Date("2024-06-12T11:25:00"),
		order: 0,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Design Principles" },
				{ checked: true, value: "User Testing" },
			],
			notes: "Create effective and engaging user experiences for mobile apps.",
			timeEstimate: 95,
		},
	},
	{
		id: 25,
		cardName: "Advanced iOS Features",
		creationDate: new Date("2024-06-12T09:50:00"),
		order: 1,
		column: Columns.completed,
		details: {
			checklist: [
				{ checked: true, value: "Work with CoreML" },
				{ checked: true, value: "Use ARKit" },
			],
			notes:
				"Integrate advanced iOS features like machine learning and augmented reality into your applications.",
			timeEstimate: 150,
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
