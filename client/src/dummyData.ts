import { Card, Columns, Template } from "./types";

export const sortingCards: Card[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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

export const databaseCards: Card[] = [
  {
    id: "9",
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
    id: "10",
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
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
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

export const webDevCards: Card[] = [
  {
    id: "15",
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
    id: "16",
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
    id: "17",
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
    id: "18",
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
    id: "19",
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

export const mobileAppCards: Card[] = [
  {
    id: "20",
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
    id: "21",
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
    id: "22",
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
    id: "23",
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
    id: "24",
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
    id: "25",
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
  id: "0",
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

///////////////// TEMPLATES ///////////////////

export const internetCards: Card[] = [
  {
    id: "da2bafc7-c7a5-4702-9f0f-dab641614741",
    cardName: "How Does The Internet Work",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Introduction to Internet https://roadmap.sh/guides/what-is-internet",
        },
        {
          checked: false,
          value:
            "Article: How does the Internet Work? https://cs.fyi/guide/how-does-internet-work",
        },
        {
          checked: false,
          value:
            "Article: How Does the Internet Work? MDN Docs https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work",
        },
        {
          checked: false,
          value:
            "Video: How does the Internet Work? https://www.youtube.com/watch?v=TNQsmPf24go",
        },
        {
          checked: false,
          value:
            "Video: How the Internet Works in 5 Minutes https://www.youtube.com/watch?v=7_LPdttKXPc",
        },
      ],
      notes: "",
      timeEstimate: 75,
    },
  },
  {
    id: "20ab84d5-f2b1-4625-ae16-bdeb0b6200b6",
    cardName: "What is HTTP",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Everything you need to know about HTTP https://cs.fyi/guide/http-in-depth",
        },
        {
          checked: false,
          value:
            "Article: What is HTTP? https://www.cloudflare.com/en-gb/learning/ddos/glossary/hypertext-transfer-protocol-http/",
        },
        {
          checked: false,
          value: "Article: How HTTPS Works …in a comic! https://howhttps.works",
        },
        {
          checked: false,
          value:
            "Article: An overview of HTTP https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        },
        {
          checked: false,
          value:
            "Article: HTTP/3 From A To Z: Core Concepts https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/",
        },
        {
          checked: false,
          value:
            "Article: HTTP/3 Is Now a Standard: Why Use It and How to Get Started https://thenewstack.io/http-3-is-now-a-standard-why-use-it-and-how-to-get-started/",
        },
        {
          checked: false,
          value:
            "Video: HTTP Crash Course & Exploration https://www.youtube.com/watch?v=iYM2zFP3Zn0",
        },
      ],
      notes: "",
      timeEstimate: 105,
    },
  },
  {
    id: "1ec4eefa-44e0-4a87-a5c9-f82d6d1a6f66",
    cardName: "What is a Domain Name",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: What is a Domain Name? https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name",
        },
        {
          checked: false,
          value:
            "Article: What is a Domain Name? | Domain name vs. URL https://www.cloudflare.com/en-gb/learning/dns/glossary/what-is-a-domain-name/",
        },
        {
          checked: false,
          value:
            "Video: A Beginners Guide to How Domain Names Work https://www.youtube.com/watch?v=Y4cRx19nhJk",
        },
      ],
      notes: "",
      timeEstimate: 45,
    },
  },
  {
    id: "4af462c7-e386-4098-9b52-635f3a77c9c3",
    cardName: "What is Hosting",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Video: What Is Web Hosting? Explained https://www.youtube.com/watch?v=htbY9-yggB0",
        },
        {
          checked: false,
          value:
            "Video: Different Types of Web Hosting Explained https://www.youtube.com/watch?v=AXVZYzw8geg",
        },
        {
          checked: false,
          value:
            "Video: Where to Host a Fullstack Project on a Budget https://www.youtube.com/watch?v=Kx_1NYYJS7Q",
        },
      ],
      notes: "",
      timeEstimate: 45,
    },
  },
  {
    id: "0c3b3bc7-5f78-4824-a1ec-e93abef0a45a",
    cardName: "What is DNS",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: What is DNS? https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/",
        },
        {
          checked: false,
          value:
            "Article: Mess with DNS - DNS Playground https://messwithdns.net/",
        },
        {
          checked: false,
          value: "Article: How DNS works (comic) https://howdns.works",
        },
        {
          checked: false,
          value:
            "Video: DNS and How does it Work? https://www.youtube.com/watch?v=WjDrMKZWCt0",
        },
        {
          checked: false,
          value:
            "Video: DNS Records https://www.youtube.com/watch?v=7lxgpKh_fRY",
        },
        {
          checked: false,
          value:
            "Video: When to add glue records to DNS settings https://www.youtube.com/watch?v=e48AyJOA9W8",
        },
        {
          checked: false,
          value:
            "Video: DNS Records for Newbies - How To Manage Website Records https://www.youtube.com/watch?v=YV5tkQYcvfg",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about DNS https://app.daily.dev/tags/dns?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: "d6f8b9a5-8e9f-4a92-a5b1-9c2f6411b6e4",
    cardName: "How Browsers Work",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: How Browsers Work https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/",
        },
        {
          checked: false,
          value:
            "Article: Role of Rendering Engine in Browsers https://www.browserstack.com/guide/browser-rendering-engine",
        },
        {
          checked: false,
          value:
            "Article: Populating the Page: How Browsers Work https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
        },
        {
          checked: false,
          value:
            "Video: How Do Web Browsers Work? https://www.youtube.com/watch?v=WjDrMKZWCt0",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about Browsers https://app.daily.dev/tags/browsers?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 75,
    },
  },
];

export const htmlCards: Card[] = [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14",
    cardName: "HTML Basics",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: W3Schools: Learn HTML https://www.w3schools.com/html/html_intro.asp",
        },
        {
          checked: false,
          value:
            "Article: MDN Docs: Getting Started with HTML https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started",
        },
        {
          checked: false,
          value: "Article: web.dev: Learn HTML https://web.dev/learn/html",
        },
        {
          checked: false,
          value: "Article: HTML Cheatsheet https://htmlcheatsheet.com",
        },
        {
          checked: false,
          value:
            "Video: HTML Full Course - Build a Website Tutorial https://www.youtube.com/watch?v=pQN-pnXPaVg",
        },
        {
          checked: false,
          value:
            "Video: HTML Tutorial for Beginners: HTML Crash Course https://www.youtube.com/watch?v=qz0aGYrrlhU",
        },
      ],
      notes: "",
      timeEstimate: 90,
    },
  },
  {
    id: "b2c3d4e5-f6g7-h8i9-j10k11-l12m13n14o15",
    cardName: "Semantic HTML",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Guide to Writing Semantic HTML https://cs.fyi/guide/writing-semantic-html",
        },
        {
          checked: false,
          value:
            "Article: W3Schools: Semantic HTML https://www.w3schools.com/html/html5_semantic_elements.asp",
        },
        {
          checked: false,
          value:
            "Article: How To Write Semantic HTML https://hackernoon.com/how-to-write-semantic-html-dkq3ulo",
        },
        {
          checked: false,
          value:
            "Article: HTML Best Practices – How to Build a Better HTML-Based Website https://www.freecodecamp.org/news/html-best-practices/",
        },
        {
          checked: false,
          value:
            "Article: Semantic HTML: What It Is and How It Improves Your Site https://blog.hubspot.com/website/semantic-html",
        },
        {
          checked: false,
          value: "Article: Semantic Markup https://html.com/semantic-markup",
        },
        {
          checked: false,
          value:
            "Article: Semantic HTML - web.dev https://web.dev/learn/html/semantic-html/",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about HTML https://app.daily.dev/tags/html?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: "c3d4e5f6-g7h8-i9j10-k11l12-m13n14o15p16",
    cardName: "Forms and Validations",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: MDN Web Docs: Client-side form validation https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation",
        },
        {
          checked: false,
          value: "Article: Learn Forms by web.dev https://web.dev/learn/forms/",
        },
        {
          checked: false,
          value:
            "Article: W3Schools: JavaScript Form Validation https://www.w3schools.com/js/js_validation.asp",
        },
      ],
      notes: "",
      timeEstimate: 45,
    },
  },
  {
    id: "d4e5f6g7-h8i9-j10k11-l12m13-n14o15p16q17",
    cardName: "Accessibility",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Developing for Web Accessibility by W3C WAI https://www.w3.org/WAI/tips/developing/",
        },
        {
          checked: false,
          value:
            "Article: Accessibility Tutorial https://www.w3schools.com/accessibility/index.php",
        },
        {
          checked: false,
          value:
            "Article: A Complete Guide To Accessible Front-End Components https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/",
        },
        {
          checked: false,
          value:
            "Article: MDN Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility",
        },
        {
          checked: false,
          value:
            "Article: Accessibility for Developers by Google https://web.dev/accessibility",
        },
        {
          checked: false,
          value:
            "Course: Web Accessibility by Udacity https://www.udacity.com/course/web-accessibility--ud891",
        },
        {
          checked: false,
          value:
            "Article: Accessibility as an Essential Part of the Inclusive Developer Experience https://thenewstack.io/accessibility-as-an-essential-part-of-the-inclusive-developer-experience/",
        },
        {
          checked: false,
          value:
            "Video: Complete Playlist on Accessibility https://youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about Accessibility https://app.daily.dev/tags/accessibility?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 135,
    },
  },
  {
    id: "e5f6g7h8-i9j10-k11l12-m13n14-o15p16q17r18",
    cardName: "Basics of SEO",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "GitHub: SEO Guide https://github.com/seo/guide",
        },
        {
          checked: false,
          value:
            "Article: Google Search Central — SEO Docs https://developers.google.com/search/docs",
        },
        {
          checked: false,
          value:
            "Article: 8 Must-Know SEO Best Practices For Developers https://neilpatel.com/blog/seo-developers/",
        },
        {
          checked: false,
          value:
            "Article: SEO for Developers https://medium.com/welldone-software/seo-for-developers-a-quick-overview-5b5b7ce34679",
        },
        {
          checked: false,
          value: "Article: Learning SEO https://learningseo.io/",
        },
        {
          checked: false,
          value:
            "Video: Complete SEO Course for Beginners https://www.youtube.com/watch?v=xsVTqzratPs",
        },
        {
          checked: false,
          value:
            "Video: SEO Expert Course https://www.youtube.com/watch?v=SnxeXZpZkI0",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about SEO https://app.daily.dev/tags/seo?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 105,
    },
  },
];

export const cssCards: Card[] = [
  {
    id: "d6e1f7g2-h3i4-j5k6-l7m8-n9o0p1q2r3s4",
    cardName: "CSS Basics",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: W3Schools — Learn CSS https://www.w3schools.com/css/",
        },
        {
          checked: false,
          value: "Article: web.dev — Learn CSS https://web.dev/learn/css/",
        },
        {
          checked: false,
          value:
            "Article: freeCodeCamp — Responsive Web Design https://www.freecodecamp.org/learn/responsive-web-design/",
        },
        {
          checked: false,
          value:
            "Article: Learn to Code HTML & CSS https://learn.shayhowe.com/html-css/building-your-first-web-page/",
        },
        {
          checked: false,
          value:
            "Video: CSS Crash Course For Absolute Beginners https://www.youtube.com/watch?v=yfoY53QXEnI",
        },
        {
          checked: false,
          value:
            "Video: HTML and CSS Tutorial https://www.youtube.com/watch?v=D-h8L5hgW-w",
        },
        {
          checked: false,
          value:
            "Video: CSS Masterclass - Tutorial & Course for Beginners https://www.youtube.com/watch?v=FqmB-Zj2-PA",
        },
      ],
      notes: "",
      timeEstimate: 105,
    },
  },
  {
    id: "e7f8g9h0-i1j2-k3l4-m5n6-o7p8q9r0s1t2",
    cardName: "Making Layouts",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Course: Learn CSS Grid for free https://scrimba.com/learn/cssgrid",
        },
        {
          checked: false,
          value:
            "Article: Learn and Practice Flexbox https://flexboxfroggy.com/",
        },
        {
          checked: false,
          value:
            "Article: Game for learning CSS Grid https://cssgridgarden.com/",
        },
        {
          checked: false,
          value:
            "Article: All about Floats https://css-tricks.com/all-about-floats/",
        },
        {
          checked: false,
          value:
            "Article: Positioning Types: How Do They Differ? https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/",
        },
        {
          checked: false,
          value:
            "Article: The Box Model https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model",
        },
        {
          checked: false,
          value:
            "Article: The CSS Display Property https://www.freecodecamp.org/news/the-css-display-property-display-none-display-table-inline-block-and-more/",
        },
        {
          checked: false,
          value:
            "Article: A Complete Guide to Flexbox https://css-tricks.com/snippets/css/a-guide-to-flexbox",
        },
        {
          checked: false,
          value:
            "Article: A Complete Guide to Grid https://css-tricks.com/snippets/css/complete-guide-grid",
        },
        { checked: false, value: "Course: Learn CSS Grid https://cssgrid.io/" },
        {
          checked: false,
          value:
            "Article: Get on the Grid at Last with the CSS Grid Layout Module https://thenewstack.io/get-grid-last-css-grid-template-markup/",
        },
      ],
      notes: "",
      timeEstimate: 165,
    },
  },
  {
    id: "f8g9h0i1-j2k3-l4m5-n6o7-p8q9r0s1t2u3",
    cardName: "Responsive Web Design",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Responsive Web Design https://www.w3schools.com/css/css_rwd_intro.asp",
        },
        {
          checked: false,
          value:
            "Article: Learn Responsive Design https://web.dev/learn/design/",
        },
        {
          checked: false,
          value:
            "Article: The Beginner’s Guide to Responsive Web Design https://kinsta.com/blog/responsive-web-design/",
        },
        {
          checked: false,
          value:
            "Article: The guide to responsive web design in 2022 https://webflow.com/blog/responsive-web-design",
        },
        {
          checked: false,
          value:
            "Video: 5 simple tips to making responsive layouts the easy way https://www.youtube.com/watch?v=VQraviuwbzU",
        },
        {
          checked: false,
          value:
            "Video: Introduction To Responsive Web Design https://www.youtube.com/watch?v=srvUrASNj0s",
        },
      ],
      notes: "",
      timeEstimate: 90,
    },
  },
];

export const jsCards: Card[] = [
  {
    id: "d1e2f3g4-h5i6-j7k8-l9m0-n1o2p3q4r5s6",
    cardName: "JavaScript Basics",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: W3Schools – JavaScript Tutorial https://www.w3schools.com/js/",
        },
        {
          checked: false,
          value:
            "Article: The Modern JavaScript Tutorial https://javascript.info/",
        },
        {
          checked: false,
          value:
            "Video: JavaScript Crash Course for Beginners https://youtu.be/hdI2bqOjy3c?t=2",
        },
        {
          checked: false,
          value:
            "Video: Build a Netflix Landing Page Clone with HTML, CSS & JS https://youtu.be/P7t13SGytRk?t=22",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: "e2f3g4h5-i6j7-k8l9-m0n1-o2p3q4r5s6t7",
    cardName: "DOM Manipulation",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "Article: DOM Tree https://javascript.info/dom-nodes",
        },
        {
          checked: false,
          value:
            "Article: GeeksForGeeks - DOM (Document Object Model) https://www.geeksforgeeks.org/dom-document-object-model/",
        },
        {
          checked: false,
          value:
            "Article: What is the DOM? https://www.freecodecamp.org/news/what-is-the-dom-document-object-model-meaning-in-javascript/",
        },
        {
          checked: false,
          value:
            "Article: Eloquent JavaScript, 3rd Edition: The Document Object Model https://eloquentjavascript.net/14_dom.html",
        },
        {
          checked: false,
          value:
            "Article: JavaScript HTML DOM https://www.w3schools.com/js/js_htmldom.asp",
        },
        {
          checked: false,
          value:
            "Article: JavaScript DOM https://www.javascripttutorial.net/javascript-dom/",
        },
        {
          checked: false,
          value:
            "Article: Learn the HTML DOM with Exercises - CodeGuage https://www.codeguage.com/courses/js/html-dom-introduction",
        },
        {
          checked: false,
          value:
            "Video: What is DOM, Shadow DOM and Virtual DOM? https://www.youtube.com/watch?v=7Tok22qxPzQ",
        },
        {
          checked: false,
          value:
            "Video: JavaScript DOM Crash Course https://www.youtube.com/watch?v=0ik6X4DJKCc",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about DOM https://app.daily.dev/tags/dom?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 150,
    },
  },
  {
    id: "f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8",
    cardName: "Fetch API",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Fetch API MDN Docs https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        },
        {
          checked: false,
          value:
            "Article: A Simple Guide to JavaScript Fetch API https://www.javascripttutorial.net/javascript-fetch-api/",
        },
        {
          checked: false,
          value:
            "Article: Introduction to Fetch https://web.dev/introduction-to-fetch/",
        },
        {
          checked: false,
          value:
            "Video: JavaScript Fetch API https://www.youtube.com/watch?v=-ZI0ea5O2oA",
        },
      ],
      notes: "",
      timeEstimate: 30,
    },
  },
];

export const internetTemplate: Template = {
  uuid: "cab9d492-b628-4dbe-9553-76b678bd976c",
  name: "Internet 101",
  cards: internetCards,
  downloads: 25,
  author: "Jeremy Spence",
};

export const htmlTemplate: Template = {
  uuid: "43c226d7-61bd-4236-8370-31254cafe163",
  name: "HTML 101",
  cards: htmlCards,
  downloads: 29,
  author: "Jeremy Spence",
};

export const cssTemplate: Template = {
  uuid: "b383e544-ea0d-4358-92d3-bbb1cdfb92e7",
  name: "CSS 101",
  cards: cssCards,
  downloads: 12,
  author: "Jeremy Spence",
};

export const jsTemplate: Template = {
  uuid: "a6d45d7b-fcba-4302-b9fe-925f0784799d",
  name: "Javascript 101",
  cards: jsCards,
  downloads: 20,
  author: "Jeremy Spence",
};
