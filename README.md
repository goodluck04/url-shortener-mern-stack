# Documentation for URL Shortener

**Version:** 1.0.0  
**Author:** Goodluck

## Overview

Welcome to the documentation for URL Shortener! This RESTful MERN Application has been developed to  as a fundamental components. It encompasses user management functionalities such as login and signup, along with the ability to perform CRUD on URL. Notably, URL creation is restricted to logged-in users. The API strictly adheres to REST principles and is built on top of Express.js with Mongoose as the database ORM, utilizing MongoDB as the backend.NextJS is used for UI/UX  using React, Tailwind CSS for Responsive Design, Redux RTK Query for state management.

## Technologies Used

- **Express.js:** The web application framework for handling HTTP requests and responses.
- **Mongoose with MongoDB:** The database toolkit and non relational database management system, ensuring secure and efficient data storage.
- **Node.js:** The server-side runtime environment known for its non-blocking I/O and event-driven architecture.
- **JSON Web Token (JWT):** Used for secure user authentication and authorization.
- **Bcryptjs:** A library for hashing passwords to enhance security.
- **VineJS:** VineJS is a form data validation library for Node.js. 

## Enviroment Variables

- create .env file in the root directory.

```
FRONTEND ENV FILE

NEXT_PUBLIC_SERVER_URI="http://localhost:8000/v1/api/"

BACKEND ENV FILE

PORT=8000
DB_URI="mongodb://localhost:27017/urlDB"
JWT_SECRET="ksnfjwjfjwwkjfelfkewsdkfdsl"




```

## How to run the Project

- Git clone the project with ` git clone https://github.com/goodluck04/url-shortener-mern-stack.git`
- Requirements for running the server `node and npm`

- Install the dependancies for client `cd client && npm i` or `cd client && npm install`
- Install the dependancies `cd server && npm i` or `cd server && npm install`
- Start the client with ` npm run dev`
- Start the server with ` npm run dev`

