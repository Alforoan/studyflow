# STUDYFLOW

![StudyFlow Logo](screenshots/StudyFlowLogo.png)

**Live:** [StudyFlow Live](https://studyflow.onrender.com/home)

Unlock focused learning. Start your personal StudyFlow today.

- Organize notes and links for anything you want to study.
- Track your progress and stay on track.

## Table of Contents

- [Team](#team)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Acknowledgements](#acknowledgements)
- [Future Plans](#future-plans)

## Team

<img src="screenshots/team/jasonmorgan.png" width="60" height="60" alt="Jason Morgan">

**Jason Morgan**
- [GitHub](https://github.com/okrayum)
- [LinkedIn](https://www.linkedin.com/in/jason-morgan-dev/)

<img src="screenshots/team/jayyong.png" width="60" height="60" alt="Jay Yong">

**Jay Yong**
- [GitHub](https://github.com/Alforoan)
- [LinkedIn](https://www.linkedin.com/in/jay-yong-480709265/)

<img src="screenshots/team/jeremyspence.png" width="60" height="60" alt="Jeremy Spence">

**Jeremy Spence**
- [GitHub](https://github.com/JeremySpence272)
- [LinkedIn](https://www.linkedin.com/in/jeremy-s-636921297/)

<img src="screenshots/team/koreyhines.png" width="60" height="60" alt="Korey Hines">

**Korey Hines**
- [GitHub](https://github.com/devkthines)
- [LinkedIn](https://www.linkedin.com/in/korey-hines/)


## Project Overview

#### Project Goals

**What is the primary goal of your project?**
The primary goal of this project is to provide users with an interface that allows them to encapsulate and organize their self study efforts all on one platform so that they can keep track of their work, organize their syllabi, and stay focused instead of getting lost in the endless rabbithole of information on the internet.

**Provide a brief summary of your project idea.**
This project will be a web app that is a kanban board specifically made for you to create and interact with a syllabus.

You will have three columns [To Do, In Progress, Completed] where you can create and manage cards. You will be able to drag and drop cards from one column to the next (if this is overly complicated we can just put a button to move the card to the next column).

Each card should have a single idea to learn about. You can add a few resources to help you learn this. Articles, youtube videos, walkthroughs, documentations etc. There will also be a section for you to add any notes that you take or links to github repos. You will also be able to estimate the amount of time that it will take to complete this card.

You should be able to see the progress through the board in a progress bar.

You will be able to create “public templates” that other people can download and work through themself.

#### Target Audience

_Independent Learners_: Those like all of us that are committed to bettering themselves and are looking for a more structured way to better their efforts. This product will attract people that have high digital literacy skills and are looking to learn an “internet skill”.

_Educators_: For educators that are looking to give their students a focused board with resources to learn a specific topic they could create a public template and share it with their students to work through at their own pace.

## Key Features

**Home**
![Home Page](screenshots/home.png)

Users can access all of the boards that they have created or downloaded. Here boards can be deleted, created, or if you're looking for something premade you can click templates to browse boards other people have uploaded.

**Board**
![Board Page](screenshots/board.png)

Users can view their boards here. You can see how much progress you have made in the board. You can move cards between columns with drag and drop. You can create a new card. You can also edit the title of the board.

**Card**
![Card Page](screenshots/card.png)

Users can view the contents of the card. Each checklist should have an external link to learn more about the given topic. Once that resource has been completed you can check it off. You can keep notes to reference later. You can also edit or delete the card.

**Templates**
![Templates Page](screenshots/templates.png)

Users can search through already made templates so they don't have to start from scratch. Templates can be downloaded to your board list so you can make any changes that you want to. Templates can also be uploaded from the boards that you have made so you can share your boards with others.

**Account**
![Account Page](screenshots/account.png)

Users can manage their account on the account page. You can edit or delete the public templates that you have uploaded as well as reset your password in case you forgot it. You can also view some of your analytics for your boards.

## Installation

1. **Clone this repository**
2. **Client:**
   - `.env` file setup:
     ```
     VITE_AUTH0_DOMAIN=dev-qdygyowfe1032c0o.us.auth0.com
     VITE_AUTH0_CLIENT_ID=nIbbTSYy3kmZ7sQm06oKxAYKxMsVVmOo
     VITE_BACKEND_URL=http://127.0.0.1:5000
     ```
   - Install packages:
     ```
     npm i
     ```
   - Start the dev environment:
     ```
     npm run dev
     ```
3. **Server:**
   - `.env` file setup:
     ```
     DB_URI=postgresql://kjs_studyflow_user:ajxed9DhHAvJl8DDFyJioiCKTD3xvh17@dpg-cpubk188fa8c739lf40g-a.oregon-postgres.render.com:5432/kjs_studyflow
     SECRET=ioc0pu7k@!*wgh58o^l$w97qmm6_xgx2^umik$s9ojo&koly7i
     JWT_SECRET=967f0637-cd39-4f0b-baf0-ce8fdb3d7132
     ```
   - Set up the virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
   - Install requirements:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the server:
     ```bash
     flask run
     ```
4. **Navigate to [http://localhost:5173/](http://localhost:5173/)**

## Demo

[![Studyflow Demo](https://img.youtube.com/vi/HwicY57h5NI/0.jpg)](https://www.youtube.com/watch?v=HwicY57h5NI)

## Tech Stack

#### Frontend

- **Rendering Framework:** React
- **Build Tool:** Vite
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS

#### Backend

- **API Framework:** Flask
- **ORM (Object-Relational Mapping):** SQLAlchemy

#### Authentication

- **Platform:** Auth0
- **Signing:** JWT

#### Database

- **Database System:** PostgreSQL

#### Deployment and Hosting

- **Platform:** Render.com

## Backend Documentation

**Models**
![Models](screenshots/api/models.png)

**API Routes - Board Management**
![Board Management](screenshots/api/boards.png)

**API Routes - Card Management**
![Card Management](screenshots/api/cards.png)

**API Routes - Template Management**
![Template Management](screenshots/api/templates.png)

**API Routes - Template Card Management**
![Template Card Management](screenshots/api/template-cards.png)

**API Routes - Additional Routes**
![Additional Routes](screenshots/api/additional-routes.png)

## Testing

**Unit Testing:**
- Tested all client-side components individually.
- Ensured components function correctly in isolation.
  
**Integration Testing:**
- Tested the interactions between API hooks and components.
- Verified seamless communication between the frontend and backend.
  
**Server-Side Testing:**
- Used pytest to test all CRUD capabilities.
- Ensured all APIs worked correctly with comprehensive tests.


## Acknowledgements

Justice Through Code - For all the classes and support to get us to the point of being able to create a project like this

Our Mentors: Abhinav Tekulapally and Ren Demeis-Ortiz

Roadmap.sh - For the information used in the premade templates

