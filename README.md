# Rule Engine with AST

# Demo App login from user and using own email or password
- Id:  User123
- Password: User@312

This 3-tier rule engine app, built with Next.js, Node.js, and MongoDB, allows users to dynamically create, combine, and evaluate eligibility rules via an AST. Clerk handles authentication, enabling a secure, user-friendly experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **User Authentication**: Users can sign up and log in using Clerk.
- **Rule Management**: Users can create and list rules.
- **Rule Combination**: Multiple rules can be combined into a single AST.
- **Rule Evaluation**: Combined rules can be evaluated against user-provided attributes.
- **Frontend and Backend Separation**: The application is divided into three main components:
  - Frontend (Next.js)
  - API (Express and Node.js)
  - Database (MongoDB)

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Icons**: Lucide icons
- **Additional Libraries**: Axios (for API requests), Clerk React SDK (for user authentication)

## Screenshots

![Screenshot 1](/frontend/images/s1.png)
![Screenshot 2](/frontend/images/s2.png)
![Screenshot 3](/frontend/images/s3.png)
![Screenshot 4](/frontend/images/s4.png)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:


## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance
- Clerk account for user authentication setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rule-engine-ast.git
   cd rule-engine-ast

- Install dependencies:
```
npm install
```
- Start the server:

```
npm run server
```

## Set up your environment variables in .env.local
```
CLERK_FRONTEND_API=<your_clerk_frontend_api>
CLERK_API_KEY=<your_clerk_api_key>
MONGO_URI=<your_mongodb_uri>
```
## Access the application:

- Client-side: http://localhost:3000
- Server-side: http://localhost:5000
