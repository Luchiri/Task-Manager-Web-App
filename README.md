# Task Manager Web App

A responsive, user-friendly Task Manager built with **React**, **Bootstrap**, and **React Router**. This app allows users to manage tasks, teams, and monitor project progress effectively.

## Features

- User authentication (dummy/local)
- Dashboard overview (all tasks, completed, pending, team members)
- Task management (create, update, delete, filter)
- Team creation and member invitations
- Role-based teams (Frontend, Backend, DevOps, Design, Fullstack)
- LocalStorage persistence (teams and tasks)
- Responsive UI with Bootstrap
- Commenting system on tasks

## Technologies Used

- React
- React Router DOM
- Bootstrap & Bootstrap Icons
- React Toastify
- LocalStorage (for demo data persistence)

## Project Structure

task-manager/

├── public/

├── src/

│ ├── components/ # Reusable components like Navbar, TaskList

│ ├── pages/ # Dashboard, Tasks, Teams, TeamForm, Login, etc.

│ ├── App.js

│ └── index.js

├── .gitignore

├── package.json

└── README.md

## Installation & Setup

1. **Clone the repository**

git clone https://github.com/luchiri/task-manager-web-app.git
cd task-manager
Install dependencies

npm install
Start the development server

npm start
Open in browser: http://localhost:3000
