import { v4 as uuidv4 } from "uuid";
import { Columns, Card, Template } from "./types";

export const internetCards: Card[] = [
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
      timeEstimate: 80,
    },
  },
];
export const reactComponentsCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "JSX",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Writing markup with JSX https://react.dev/learn/writing-markup-with-jsx",
        },
        {
          checked: false,
          value:
            "official: JavaScript in JSX with Curly Braces https://react.dev/learn/javascript-in-jsx-with-curly-braces",
        },
        {
          checked: false,
          value:
            "article: JSX in React – Explained with Examples https://www.freecodecamp.org/news/jsx-in-react-introduction/",
        },
        {
          checked: false,
          value:
            "article: Working with JSX - React - CodeGuage https://www.codeguage.com/courses/react/jsx",
        },
        {
          checked: false,
          value:
            "article: JSX in React on w3school https://www.w3schools.com/react/react_jsx.asp",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about JSX https://app.daily.dev/tags/jsx?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: uuidv4(),
    cardName: "Props vs State",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: State: A Component’s Memory https://react.dev/learn/state-a-components-memory",
        },
        {
          checked: false,
          value:
            "article: How to use Props in React https://www.robinwieruch.de/react-pass-props-to-component/",
        },
        {
          checked: false,
          value:
            "article: What is the difference between state and props in React? https://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react",
        },
        {
          checked: false,
          value:
            "article: How to update state from props in React https://www.robinwieruch.de/react-derive-state-props/",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Conditional Rendering",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Conditional Rendering https://react.dev/learn/conditional-rendering",
        },
        {
          checked: false,
          value:
            "article: Different techniques for conditional rendering in React https://www.robinwieruch.de/conditional-rendering-react/",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Composition vs Inheritance",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Passing JSX as children https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children",
        },
        {
          checked: false,
          value:
            "article: Composition vs Inheritance https://reactjs.org/docs/composition-vs-inheritance.html",
        },
        {
          checked: false,
          value:
            "article: How to perform component composition in React https://www.robinwieruch.de/react-component-composition/",
        },
        {
          checked: false,
          value:
            "article: Achieving Reusability With React Composition https://formidable.com/blog/2021/react-composition/",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "useState Hook",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Using the State Hook https://react.dev/reference/react/useState",
        },
        {
          checked: false,
          value:
            "article: React useState Hook by Example https://www.robinwieruch.de/react-usestate-hook/",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "useEffect Hook",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Using the Effect Hook https://react.dev/reference/react/useEffect",
        },
        {
          checked: false,
          value:
            "article: React useEffect Hook by Example https://www.robinwieruch.de/react-useeffect-hook/",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
];

export const reactRenderingCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Component Life Cycle",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Class Component https://react.dev/reference/react/Component",
        },
        {
          checked: false,
          value:
            "official: Lifecycle of Reactive Effects https://react.dev/learn/lifecycle-of-reactive-effects",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Lists and Keys",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Lists and Keys https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
        },
        {
          checked: false,
          value:
            "official: Rendering Lists https://react.dev/learn/rendering-lists",
        },
        {
          checked: false,
          value:
            "article: List components in React by Example https://www.robinwieruch.de/react-list-component/",
        },
        {
          checked: false,
          value:
            "article: Why do we need the key prop in React? https://www.robinwieruch.de/react-list-key/",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Render Props",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Render Props in React https://react.dev/learn/passing-props-to-a-component",
        },
        {
          checked: false,
          value:
            "article: How to create a Render Prop Component https://www.robinwieruch.de/react-render-props/",
        },
        {
          checked: false,
          value:
            "article: Render Props Pattern https://www.patterns.dev/posts/render-props-pattern/",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Refs",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Referencing Values with Refs https://react.dev/learn/referencing-values-with-refs",
        },
        {
          checked: false,
          value:
            "official: Manipulating the DOM with Refs https://react.dev/learn/manipulating-the-dom-with-refs",
        },
        {
          checked: false,
          value:
            "article: Examples of using refs in React https://www.robinwieruch.de/react-ref/",
        },
        {
          checked: false,
          value:
            "article: The Complete Guide to useRef() and Refs in React https://dmitripavlutin.com/react-useref-guide/",
        },
        {
          checked: false,
          value:
            "article: What Exactly Are Refs? - React - CodeGuage https://www.codeguage.com/courses/react/refs",
        },
        {
          checked: false,
          value:
            "video: Learn useRef in 11 Minutes - Web Dev Simplified https://www.youtube.com/watch?v=t2ypzz6gJm0",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: uuidv4(),
    cardName: "Events",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Responding to Events https://react.dev/learn/responding-to-events",
        },
        {
          checked: false,
          value:
            "official: React Event Object (Synthetic Event) https://react.dev/reference/react-dom/components/common#react-event-object",
        },
        {
          checked: false,
          value:
            "article: React Event Handler https://www.robinwieruch.de/react-event-handler/",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "High Order Components",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: High-Order Components https://reactjs.org/docs/higher-order-components.html",
        },
        {
          checked: false,
          value:
            "article: How to create a Higher-Order Component https://www.robinwieruch.de/react-higher-order-components/",
        },
        {
          checked: false,
          value:
            "video: Learn React Higher Order Component (HOC) in 10 Minutes https://youtu.be/J5P0q7EROfw?si=-8s5h1b0mZSGVgLt",
        },
        {
          checked: false,
          value:
            "video: ReactJS Tutorial - Higher Order Components (Part 1) https://www.youtube.com/watch?v=B6aNv8nkUSw",
        },
        {
          checked: false,
          value:
            "video: ReactJS Tutorial - Higher Order Components (Part 2) https://www.youtube.com/watch?v=rsBQj6X7UK8",
        },
        {
          checked: false,
          value:
            "video: ReactJS Tutorial - Higher Order Components (Part 3) https://www.youtube.com/watch?v=l8V59zIdBXU",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
];

export const reactStateManagementCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Recoil",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Recoil - Official Website https://recoiljs.org/",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about React https://app.daily.dev/tags/react?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "MobX",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: MobX Official Website https://mobx.js.org/",
        },
        {
          checked: false,
          value:
            "video: Intro to MobX Tutorial https://www.youtube.com/watch?v=WQQq1QbYlAw",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about React https://app.daily.dev/tags/react?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Redux / Toolkit",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: Redux Toolkit - ReduxJS https://redux-toolkit.js.org/",
        },
        {
          checked: false,
          value: "article: Official Website https://redux.js.org/",
        },
        {
          checked: false,
          value:
            "article: Official Getting Started to Redux https://redux.js.org/introduction/getting-started",
        },
        {
          checked: false,
          value:
            "article: Redux Toolkit Official Website https://redux-toolkit.js.org",
        },
        {
          checked: false,
          value:
            "article: Official Tutorial to Learn Redux https://redux.js.org/tutorials/essentials/part-1-overview-concepts",
        },
        {
          checked: false,
          value:
            "video: Redux Tutorial - Beginner to Advanced https://youtube.com/watch?v=zrs7u6bdbUw",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Redux https://app.daily.dev/tags/redux?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 140,
    },
  },
  {
    id: uuidv4(),
    cardName: "Zustand",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "GitHub: Zustand - Official Website https://github.com/pmndrs/zustand",
        },
        {
          checked: false,
          value: "GitHub: Zustand Repository https://github.com/pmndrs/zustand",
        },
        {
          checked: false,
          value:
            "article: Working with Zustand https://tkdodo.eu/blog/working-with-zustand",
        },
        {
          checked: false,
          value:
            "article: Zustand - Official Documentation https://docs.pmnd.rs/zustand/getting-started/introduction",
        },
        {
          checked: false,
          value:
            "video: Zustand Tutorial for Beginners https://www.youtube.com/watch?v=AYO4qHAnLQI&t",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
  {
    id: uuidv4(),
    cardName: "Context",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Passing Data Deeply with Context https://react.dev/learn/passing-data-deeply-with-context",
        },
        {
          checked: false,
          value:
            "article: Basic useContext Guide https://www.w3schools.com/react/react_usecontext.asp",
        },
        {
          checked: false,
          value:
            "article: State with useContext and useState/useReducer https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
];

export const reactStylingCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Emotion",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Official Website and Docs https://emotion.sh/docs/introduction",
        },
        {
          checked: false,
          value:
            "video: Styled components using emotion in React https://www.youtube.com/watch?v=yO3JU2bMLGA",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Styled Components",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Official Website https://styled-components.com/",
        },
        {
          checked: false,
          value: "article: Official Docs https://styled-components.com/docs",
        },
        {
          checked: false,
          value:
            "article: Best Practices for Styled Components https://www.robinwieruch.de/styled-components/",
        },
        {
          checked: false,
          value:
            "video: Styled Components Crash Course & Project https://www.youtube.com/watch?v=02zO0hZmwnw",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Styled Components https://app.daily.dev/tags/styled-components?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
  {
    id: uuidv4(),
    cardName: "CSS Modules",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "GitHub: Project GitHub Repository https://github.com/css-modules/css-modules",
        },
        {
          checked: false,
          value:
            "article: Using CSS Modules In React App https://medium.com/@ralph1786/using-css-modules-in-react-app-c2079eadbb87",
        },
        {
          checked: false,
          value:
            "video: CSS Modules: Why are they great? https://www.youtube.com/watch?v=pKMWU9OrA2s",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about CSS https://app.daily.dev/tags/css?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "TailwindCSS",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Tailwind Website https://tailwindcss.com",
        },
        {
          checked: false,
          value:
            "video: Tailwind CSS Full Course for Beginners https://www.youtube.com/watch?v=lCxcTsOHrjo",
        },
        {
          checked: false,
          value:
            "video: Tailwind CSS Crash Course https://www.youtube.com/watch?v=UBOj6rqRUME",
        },
        {
          checked: false,
          value:
            "video: Should You Use Tailwind CSS? https://www.youtube.com/watch?v=hdGsFpZ0J2E",
        },
        {
          checked: false,
          value:
            "video: Official Screencasts https://www.youtube.com/c/TailwindLabs/videos",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Tailwind CSS https://app.daily.dev/tags/tailwind-css?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: uuidv4(),
    cardName: "Material UI",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Official Website https://mui.com/material-ui/",
        },
        {
          checked: false,
          value:
            "article: Official Documentation https://mui.com/material-ui/getting-started/",
        },
        {
          checked: false,
          value:
            "video: Material UI React Tutorial https://www.youtube.com/watch?v=o1chMISeTC0",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Mantine",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "official: Mantine Website https://mantine.dev/",
        },
        {
          checked: false,
          value:
            "official: Usage with Create React App https://mantine.dev/guides/cra/",
        },
        {
          checked: false,
          value:
            "article: 5 Mantine Hooks for UI management https://blog.logrocket.com/5-mantine-hooks-simplifying-ui-management-react/",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
];

export const reactApiCallsCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "REST - SWR",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: SWR: React Hooks for Data Fetching https://swr.vercel.app/",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Next.js https://app.daily.dev/tags/nextjs?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "REST - react-query",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "GitHub: TanStack Query https://github.com/TanStack/query",
        },
        {
          checked: false,
          value:
            "video: React Query in 100 Seconds https://www.youtube.com/watch?v=novnyCaa7To",
        },
        {
          checked: false,
          value:
            "video: React Query Tutorial for Beginners - Complete Playlist https://www.youtube.com/playlist?list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about React https://app.daily.dev/tags/react?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "REST - Axios",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: Axios Getting Started https://axios-http.com/docs/intro",
        },
        {
          checked: false,
          value:
            "article: How To Use Axios With React: The Definitive Guide https://www.freecodecamp.org/news/how-to-use-axios-with-react/",
        },
        {
          checked: false,
          value:
            "article: How to make HTTP requests with Axios https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/#why",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Axios https://app.daily.dev/tags/axios?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "GraphQL - Apollo",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Apollo Website https://www.apollographql.com",
        },
        {
          checked: false,
          value: "article: Official Docs https://www.apollographql.com/docs/",
        },
        {
          checked: false,
          value:
            "video: Official YouTube Channel https://www.youtube.com/c/ApolloGraphQL/",
        },
        {
          checked: false,
          value:
            "video: GraphQL With React Tutorial - Apollo Client https://www.youtube.com/watch?v=YyUWW04HwKY",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Apollo https://app.daily.dev/tags/apollo?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
  {
    id: uuidv4(),
    cardName: "GraphQL - Relay",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Apollo Website https://www.apollographql.com",
        },
        {
          checked: false,
          value: "article: Official Docs https://www.apollographql.com/docs/",
        },
        {
          checked: false,
          value:
            "video: Official YouTube Channel https://www.youtube.com/c/ApolloGraphQL/",
        },
        {
          checked: false,
          value:
            "video: GraphQL With React Tutorial - Apollo Client https://www.youtube.com/watch?v=YyUWW04HwKY",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Apollo https://app.daily.dev/tags/apollo?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
];

export const reactTestingCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Jest",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "article: Jest Website https://jestjs.io/",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Jest https://app.daily.dev/tags/jest?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Vitest",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "official: Vitest Website https://vitest.dev/",
        },
        {
          checked: false,
          value:
            "video: Testing with Vitest https://www.youtube.com/watch?v=cM_AeQHzlGg",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "React Testing Library",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: React Testing Library https://testing-library.com/docs/react-testing-library/intro/",
        },
        {
          checked: false,
          value:
            "article: How to use React Testing Library https://www.robinwieruch.de/react-testing-library/",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about React https://app.daily.dev/tags/react?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Cypress",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value: "official: Official Website https://www.cypress.io/",
        },
        {
          checked: false,
          value:
            "article: Official Documentation https://docs.cypress.io/guides/overview/why-cypress#Other",
        },
        {
          checked: false,
          value:
            "video: Cypress End-to-End Testing https://www.youtube.com/watch?v=7N63cMKosIE",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Cypress https://app.daily.dev/tags/cypress?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Testing",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "official: Official Website: Playwright https://playwright.dev/",
        },
        {
          checked: false,
          value:
            "article: Playwright Tutorial: Learn Basics and Setup https://www.browserstack.com/guide/playwright-tutorial",
        },
        {
          checked: false,
          value:
            "video: Get started with end-to-end testing: Playwright https://www.youtube.com/playlist?list=PLQ6Buerc008ed-F9OksF7ek37wR3y916p",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
];

export const dataStructuresCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Array",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "course: Array Data Structure - Coursera https://www.coursera.org/lecture/data-structures/arrays-OsBSF",
        },
        {
          checked: false,
          value:
            "course: Dynamic Arrays - Coursera https://www.coursera.org/lecture/data-structures/dynamic-arrays-EwbnV",
        },
        {
          checked: false,
          value:
            "article: UC Berkeley CS61B - Linear and Multi-Dim Arrays (Start watching from 15m 32s) https://archive.org/details/ucberkeley_webcast_Wp8oiO_CZZE",
        },
        {
          checked: false,
          value:
            "video: Array Data Structure | Illustrated Data Structures https://www.youtube.com/watch?v=QJNwK2uJyGs",
        },
        {
          checked: false,
          value:
            "video: Dynamic and Static Arrays https://www.youtube.com/watch?v=PEnFFiQe1pM&list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu&index=6",
        },
        {
          checked: false,
          value:
            "video: Dynamic Array Code https://www.youtube.com/watch?v=tvw4v7FEF1w&list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu&index=5",
        },
        {
          checked: false,
          value:
            "video: Jagged Arrays https://www.youtube.com/watch?v=1jtrQqYpt7g",
        },
      ],
      notes: "",
      timeEstimate: 140,
    },
  },
  {
    id: uuidv4(),
    cardName: "Linked List",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "course: Singly Linked Lists https://www.coursera.org/lecture/data-structures/singly-linked-lists-kHhgK",
        },
        {
          checked: false,
          value:
            "course: Core: Linked Lists vs Arrays https://www.coursera.org/lecture/data-structures-optimizing-performance/core-linked-lists-vs-arrays-rjBs9",
        },
        {
          checked: false,
          value:
            "course: In the Real World: Linked Lists vs Arrays https://www.coursera.org/lecture/data-structures-optimizing-performance/in-the-real-world-lists-vs-arrays-QUaUd",
        },
        {
          checked: false,
          value:
            "course: Doubly Linked Lists https://www.coursera.org/lecture/data-structures/doubly-linked-lists-jpGKD",
        },
        {
          checked: false,
          value:
            "article: CS 61B Lecture 7: Linked Lists I https://archive.org/details/ucberkeley_webcast_htzJdKoEmO0",
        },
        {
          checked: false,
          value:
            "article: CS 61B Lecture 7: Linked Lists II https://archive.org/details/ucberkeley_webcast_-c4I3gFYe3w",
        },
        {
          checked: false,
          value:
            "video: Linked List Data Structure | Illustrated Data Structures https://www.youtube.com/watch?v=odW9FU8jPRQ",
        },
        {
          checked: false,
          value:
            "video: Linked Lists in 4 minutes https://www.youtube.com/watch?v=F8AbOfQwl1c",
        },
        {
          checked: false,
          value:
            "video: Why you should avoid Linked Lists? https://www.youtube.com/watch?v=YQs6IC-vgmo",
        },
      ],
      notes: "",
      timeEstimate: 180,
    },
  },
  {
    id: uuidv4(),
    cardName: "Stack",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "course: Stack Data Structure https://www.coursera.org/lecture/data-structures/stacks-UdKzQ",
        },
        {
          checked: false,
          value:
            "video: Stack Data Structure | Illustrated Data Structures https://www.youtube.com/watch?v=I5lq6sCuABE",
        },
        {
          checked: false,
          value:
            "video: Stack in 3 minutes https://www.youtube.com/watch?v=KcT3aVgrrpU",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Queue",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "course: Queues - Coursera https://www.coursera.org/lecture/data-structures/queues-EShpq",
        },
        {
          checked: false,
          value:
            "article: Circular Buffer - Wikipedia https://en.wikipedia.org/wiki/Circular_buffer",
        },
        {
          checked: false,
          value:
            "video: Queue Data Structure | Illustrated Data Structures https://www.youtube.com/watch?v=mDCi1lXd9hc",
        },
        {
          checked: false,
          value:
            "video: Queue in 3 Minutes https://www.youtube.com/watch?v=D6gu-_tmEpQ",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Hash Table",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "video: Hash Table | Illustrated Data Structures https://www.youtube.com/watch?v=jalSiaIi8j4",
        },
        {
          checked: false,
          value: "video: Hash Table in 4 Minutes https://youtu.be/knV86FlSXJ8",
        },
        {
          checked: false,
          value:
            "video: Hashing with Chaining https://www.youtube.com/watch?v=0M_kIqhwbFo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=9",
        },
        {
          checked: false,
          value:
            "video: Table Doubling, Karp-Rabin https://www.youtube.com/watch?v=BRO7mVIFt08&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=10",
        },
        {
          checked: false,
          value:
            "video: Open Addressing, Cryptographic Hashing https://www.youtube.com/watch?v=rvdJDijO2Ro&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=11",
        },
        {
          checked: false,
          value:
            "video: PyCon 2010: The Mighty Dictionary https://www.youtube.com/watch?v=C4Kc8xzcA68",
        },
        {
          checked: false,
          value:
            "video: PyCon 2017: The Dictionary Even Mightier https://www.youtube.com/watch?v=66P5FMkWoVU",
        },
        {
          checked: false,
          value:
            "video: (Advanced) Randomization: Universal & Perfect Hashing https://www.youtube.com/watch?v=z0lJ2k0sl1g&list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp&index=11",
        },
        {
          checked: false,
          value:
            "video: (Advanced) Perfect hashing https://www.youtube.com/watch?v=N0COwN14gt0&list=PL2B4EEwhKD-NbwZ4ezj7gyc_3yNrojKM9&index=4",
        },
      ],
      notes: "",
      timeEstimate: 180,
    },
  },
  {
    id: uuidv4(),
    cardName: "Tree",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: Tree Data Structure - Geeks for Geeks https://www.geeksforgeeks.org/introduction-to-tree-data-structure-and-algorithm-tutorials/",
        },
        {
          checked: false,
          value:
            "video: Tree | Illustrated Data Structures https://www.youtube.com/watch?v=S2W3SXGPVyU",
        },
        {
          checked: false,
          value:
            "video: Binary Trees - Part 1 https://www.youtube.com/watch?v=76dhtgZt38A&list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY&index=9",
        },
        {
          checked: false,
          value:
            "video: Binary Trees - Part 2 https://www.youtube.com/watch?v=U1JYwHcFfso&list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY&index=10",
        },
        {
          checked: false,
          value:
            "feed: Explore top posts about Binary Tree https://app.daily.dev/tags/binary-tree?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
  {
    id: uuidv4(),
    cardName: "Graph",
    order: 7,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: Graph Data Structure https://www.simplilearn.com/tutorials/data-structure-tutorial/graphs-in-data-structure",
        },
        {
          checked: false,
          value:
            "video: Graph Data Structure | Illustrated Data Structures https://www.youtube.com/watch?v=0sQE8zKhad0",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 10 - Graph Data Structures https://www.youtube.com/watch?v=Sjk0xqWWPCc&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=10",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 11 - Graph Traversal https://www.youtube.com/watch?v=ZTwjXj81NVY&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=11",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 12 - Depth First Search https://www.youtube.com/watch?v=KyordYB3BOs&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=12",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 13 - Minimum Spanning Trees https://www.youtube.com/watch?v=oolm2VnJUKw&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=13",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 14 - Minimum Spanning Trees (cont) https://www.youtube.com/watch?v=RktgPx0MarY&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=14",
        },
        {
          checked: false,
          value:
            "video: CSE373 2020 - Lecture 15 - Graph Algorithms (cont 2) https://www.youtube.com/watch?v=MUe5DXRhyAo&list=PLOtl7M3yp-DX6ic0HGT0PUX_wiNmkWkXx&index=15",
        },
        {
          checked: false,
          value:
            "video: 6.006 Single-Source Shortest Paths Problem https://www.youtube.com/watch?v=Aa2sqUhIn-E&index=15&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb",
        },
      ],
      notes: "",
      timeEstimate: 180,
    },
  },
  {
    id: uuidv4(),
    cardName: "Heap",
    order: 8,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "course: Priority Queue - Introduction https://www.coursera.org/lecture/data-structures/introduction-2OpTs",
        },
        {
          checked: false,
          value:
            "article: CS 61B Lecture 24: Priority Queues https://archive.org/details/ucberkeley_webcast_yIUFT6AKBGE",
        },
        {
          checked: false,
          value:
            "video: Heap | Illustrated Data Structures https://www.youtube.com/watch?v=F_r0sJ1RqWk",
        },
        {
          checked: false,
          value:
            "video: Heaps and Heap Sort https://www.youtube.com/watch?v=B7hVxCmfPtM&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=5",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
];

export const asymptoticNotationCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Big O Notation",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "article: CS 61B Lecture 19: Asymptotic Analysis https://archive.org/details/ucberkeley_webcast_VIS4YDpuP98",
        },
        {
          checked: false,
          value:
            "video: Big O Notation — Calculating Time Complexity https://www.youtube.com/watch?v=Z0bH0cMY0E8",
        },
        {
          checked: false,
          value:
            "video: Big O Notations https://www.youtube.com/watch?v=V6mKVRU1evU",
        },
        {
          checked: false,
          value:
            "video: Big Oh Notation (and Omega and Theta) https://www.youtube.com/watch?v=ei-A_wy5Yxw&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN&index=3",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Big Theta and Big Omega",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "video: Big Oh Notation (and Omega and Theta) https://www.youtube.com/watch?v=ei-A_wy5Yxw&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN&index=3",
        },
        {
          checked: false,
          value:
            "video: Asymptotic Notation - CS50 https://www.youtube.com/watch?v=iOq5kSKqeR4",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Common Runtimes",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "video: Big O Notation — Calculating Time Complexity https://www.youtube.com/watch?v=Z0bH0cMY0E8",
        },
        {
          checked: false,
          value:
            "video: Big O Notations https://www.youtube.com/watch?v=V6mKVRU1evU",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
];

export const sortingAlgorithmsCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Bubble Sort",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Video: Bubble Sort https://www.youtube.com/watch?v=P00xJgWzz2c&index=1&list=PL89B61F78B552C1AB",
        },
        {
          checked: false,
          value:
            "Video: Analyzing Bubble Sort https://www.youtube.com/watch?v=ni_zk257Nqo&index=7&list=PL89B61F78B552C1AB",
        },
        {
          checked: false,
          value: "Video: Bubble sort in 2 minutes https://youtu.be/xli_FI7CuzA",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Selection Sort",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Course: Selection Sort https://www.coursera.org/lecture/algorithms-part1/selection-UQxFT",
        },
        {
          checked: false,
          value:
            "Video: Selection Sort in 3 Minutes https://www.youtube.com/watch?v=g-PGLbMth_g",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Insertion Sort",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Insertion Sort Algorithm https://www.programiz.com/dsa/insertion-sort",
        },
        {
          checked: false,
          value:
            "Video: Insertion Sort — MIT https://www.youtube.com/watch?v=Kg4bqzAqRBM&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=4",
        },
        {
          checked: false,
          value:
            "Video: Insertion Sort in 3 Minutes https://www.youtube.com/watch?v=JU767SDMDvA",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Heap Sort",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Course: Heap Sort Algorithm https://www.coursera.org/lecture/data-structures/heap-sort-hSzMO",
        },
        {
          checked: false,
          value:
            "Article: Heap Sort Algorithm https://www.programiz.com/dsa/heap-sort",
        },
        {
          checked: false,
          value:
            "Article: Heap Sort Algorithm - Geeks for Geeks https://www.geeksforgeeks.org/heap-sort/",
        },
        {
          checked: false,
          value:
            "Video: Heap Sort in 4 Minutes https://www.youtube.com/watch?v=2DmK_H7IdTo",
        },
        {
          checked: false,
          value:
            "Video: Heap Sort Algorithm - MIT https://www.youtube.com/watch?v=odNJmw5TOEE&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&t=3291s",
        },
        {
          checked: false,
          value:
            "Video: Lecture 4 - Heaps and Heap Sort https://www.youtube.com/watch?v=B7hVxCmfPtM&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=5",
        },
      ],
      notes: "",
      timeEstimate: 120,
    },
  },
  {
    id: uuidv4(),
    cardName: "Quick Sort",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "GitHub: Quick Sort Implementation in Python https://github.com/jwasham/practice-python/blob/master/quick_sort/quick_sort.py",
        },
        {
          checked: false,
          value:
            "Article: Quick Sort Algorithm https://www.programiz.com/dsa/quick-sort",
        },
        {
          checked: false,
          value:
            "Article: Quick Sort Algorithm - Geeks for Geeks https://www.geeksforgeeks.org/quick-sort/",
        },
        {
          checked: false,
          value:
            "Article: Quick Sort Implementation in C http://www.cs.yale.edu/homes/aspnes/classes/223/examples/randomization/quick.c",
        },
        {
          checked: false,
          value:
            "Video: Quick Sort in 4 Minutes https://www.youtube.com/watch?v=Hoixgm4-P4M&feature=youtu.be",
        },
      ],
      notes: "",
      timeEstimate: 100,
    },
  },
  {
    id: uuidv4(),
    cardName: "Merge Sort",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Merge Sort - Geeks for Geeks https://www.geeksforgeeks.org/merge-sort/",
        },
        {
          checked: false,
          value:
            "Article: Merge Sort Algorithm https://www.programiz.com/dsa/merge-sort",
        },
        {
          checked: false,
          value:
            "Article: Merge Sort for Linked Lists https://www.geeksforgeeks.org/merge-sort-for-linked-list/",
        },
        {
          checked: false,
          value:
            "Video: Merge Sort in 3 Minutes https://www.youtube.com/watch?v=4VqmGXwpLqc",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
];

export const treeAndGraphAlgorithmsCards: Card[] = [
  {
    id: uuidv4(),
    cardName: "Tree Traversal",
    order: 1,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Tree Traversals (Inorder, Preorder and Postorder) https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
        },
        {
          checked: false,
          value:
            "Video: Tree | Illustrated Data Structures https://www.youtube.com/watch?v=S2W3SXGPVyU",
        },
        {
          checked: false,
          value:
            "Video: Pre-order tree traversal in 3 minutes https://www.youtube.com/watch?v=1WxLM2hwL-U",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Tree Search",
    order: 2,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Tree Traversals (Inorder, Preorder and Postorder) https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
        },
        {
          checked: false,
          value:
            "Video: Tree | Illustrated Data Structures https://www.youtube.com/watch?v=S2W3SXGPVyU",
        },
      ],
      notes: "",
      timeEstimate: 40,
    },
  },
  {
    id: uuidv4(),
    cardName: "Graph Search",
    order: 3,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: Breadth First Search or BFS for a Graph https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
        },
        {
          checked: false,
          value:
            "Video: Graph Algorithms II - DFS, BFS, Kruskals Algorithm, Union Find Data Structure - Lecture 7 https://www.youtube.com/watch?v=ufj5_bppBsA&list=PLFDnELG9dpVxQCxuD-9BSy2E7BWY3t5Sm&index=7",
        },
        {
          checked: false,
          value:
            "Video: Breadth-first search in 4 minutes https://www.youtube.com/watch?v=hz5ytanv5qe",
        },
        {
          checked: false,
          value:
            "Article: Depth First Search or DFS for a Graph https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/?ref=lbp",
        },
      ],
      notes: "",
      timeEstimate: 80,
    },
  },
  {
    id: uuidv4(),
    cardName: "Bellman Ford's Algorithm",
    order: 4,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Video: Bellman-Ford - MIT https://www.youtube.com/watch?v=f9cVS_URPc0&ab_channel=MITOpenCourseWare",
        },
        {
          checked: false,
          value:
            "Video: Bellman-Ford in 4 Minutes https://www.youtube.com/watch?v=9PHkk0UavIM",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about Data Science https://app.daily.dev/tags/data-science?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "Dijkstra's Algorithm",
    order: 5,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Video: Dijkstras Algorithm - MIT https://www.youtube.com/watch?v=NSHizBK9JD8&t=1731s&ab_channel=MITOpenCourseWare",
        },
        {
          checked: false,
          value:
            "Video: Dijkstras Algorithm in 3 Minutes https://www.youtube.com/watch?v=_lHSawdgXpI",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about Data Science https://app.daily.dev/tags/data-science?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
  {
    id: uuidv4(),
    cardName: "A* Algorithm",
    order: 6,
    column: Columns.backlog,
    creationDate: new Date(),
    details: {
      checklist: [
        {
          checked: false,
          value:
            "Article: A* Search Algorithm - Wikipedia https://en.wikipedia.org/wiki/A*_search_algorithm",
        },
        {
          checked: false,
          value:
            "Video: A* Pathfinding (E01: algorithm explanation) https://www.youtube.com/watch?v=-L-WgKMFuhE",
        },
        {
          checked: false,
          value:
            "Feed: Explore top posts about Data Science https://app.daily.dev/tags/data-science?ref=roadmapsh",
        },
      ],
      notes: "",
      timeEstimate: 60,
    },
  },
];

export const internetTemplate: Template = {
  uuid: uuidv4(),
  name: "Internet 101",
  cards: internetCards,
  downloads: 12,
  author: "jeremy.spence272@gmail.com",
};

export const htmlTemplate: Template = {
  uuid: uuidv4(),
  name: "HTML 101",
  cards: htmlCards,
  downloads: 7,
  author: "jeremy.spence272@gmail.com",
};

export const cssTemplate: Template = {
  uuid: uuidv4(),
  name: "CSS 101",
  cards: cssCards,
  downloads: 16,
  author: "jeremy.spence272@gmail.com",
};

export const jsTemplate: Template = {
  uuid: uuidv4(),
  name: "Javascript 101",
  cards: jsCards,
  downloads: 3,
  author: "jeremy.spence272@gmail.com",
};

export const reactComponentsTemplate: Template = {
  uuid: uuidv4(),
  name: "React Components",
  cards: reactComponentsCards,
  downloads: 18,
  author: "jeremy.spence272@gmail.com",
};
export const reactRenderingTemplate: Template = {
  uuid: uuidv4(),
  name: "React Rendering",
  cards: reactRenderingCards,
  downloads: 9,
  author: "jeremy.spence272@gmail.com",
};
export const reactStateManagementTemplate: Template = {
  uuid: uuidv4(),
  name: "React State Management",
  cards: reactStateManagementCards,
  downloads: 11,
  author: "jeremy.spence272@gmail.com",
};
export const reactStylingTemplate: Template = {
  uuid: uuidv4(),
  name: "React Styling",
  cards: reactStylingCards,
  downloads: 15,
  author: "jeremy.spence272@gmail.com",
};
export const reactAPICallsTemplate: Template = {
  uuid: uuidv4(),
  name: "React API Calls",
  cards: reactApiCallsCards,
  downloads: 6,
  author: "jeremy.spence272@gmail.com",
};
export const reactTestingTemplate: Template = {
  uuid: uuidv4(),
  name: "React Testing",
  cards: reactTestingCards,
  downloads: 17,
  author: "jeremy.spence272@gmail.com",
};
export const asymptoticNotationTemplate: Template = {
  uuid: uuidv4(),
  name: "Asymptotic Notation",
  cards: asymptoticNotationCards,
  downloads: 2,
  author: "jeremy.spence272@gmail.com",
};
export const sortingAlgorithmsTemplate: Template = {
  uuid: uuidv4(),
  name: "Sorting Algorithms",
  cards: sortingAlgorithmsCards,
  downloads: 20,
  author: "jeremy.spence272@gmail.com",
};
export const treeAndGraphAlgorithmsTemplate: Template = {
  uuid: uuidv4(),
  name: "Tree & Graph Algorithms",
  cards: treeAndGraphAlgorithmsCards,
  downloads: 10,
  author: "jeremy.spence272@gmail.com",
};

// export const templatesToUpload: Template[] = [
//   internetTemplate,
//   htmlTemplate,
//   cssTemplate,
//   jsTemplate,
//   reactComponentsTemplate,
//   reactRenderingTemplate,
//   reactStateManagementTemplate,
//   reactStylingTemplate,
//   reactAPICallsTemplate,
//   reactTestingTemplate,
//   asymptoticNotationTemplate,
//   sortingAlgorithmsTemplate,
//   treeAndGraphAlgorithmsTemplate,
// ];

export const templatesToUpload: Template[] = [];
