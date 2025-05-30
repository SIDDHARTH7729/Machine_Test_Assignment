Agents App – Backend

This repository contains the backend application for the Machine Test for MERN Stack Developer project. It provides the API services and database management for user authentication, agent creation, and the distribution of tasks from uploaded lists.
🎯 Project Overview

This backend serves as the core logic and data management layer for the Agents App. Its primary responsibilities include:

    Authenticating Admin Users.

    Managing Agent data (creation, retrieval).

    Processing uploaded CSV/Excel files and distributing tasks among agents.

    Persisting all application data in MongoDB.

For the frontend application, please refer to the Frontend Repository at -> https://github.com/SIDDHARTH7729/Machine_Test_Assignment_Frontend

✨ Features

    🔐 User Authentication: Secure user login and registration with email/password, utilizing JSON Web Tokens (JWT) for session management.

    👤 Agent Management: API endpoints for creating, retrieving, and managing agent profiles (Name, Email, Mobile, Password).

    📤 File Upload & Processing: Handles CSV/XLSX file uploads, validates data format, and processes the list items.

    🔄 Task Distribution Logic: Implements a mechanism to equally distribute uploaded list items among registered agents, handling remainders sequentially.

    💾 Data Persistence: Stores user, agent, and distributed task data in MongoDB.

    🔒 Secure API Endpoints: Protected routes ensuring only authenticated users can access sensitive operations.

🧱 Tech Stack

    Runtime Environment: Node.js
    Web Framework: Express.js
    Database: MongoDB
    ODM (Object Data Modeling): Mongoose
    Authentication: JSON Web Tokens (JWT), bcryptjs for password hashing.
    CORS: cors middleware for Cross-Origin Resource Sharing.
    Environment Variables: dotenv
    File Uploads: multer
    CSV/Excel Parsing: xlsx
    Development Utility: nodemon for automatic server restarts.
    Cookie Handling: cookie
    UUID Generation: uuid

📁 Project Structure (Important)

The backend application follows a modular structure to organize different concerns:

src/
├── config/                  # Configuration files for the server and other env variables settings.
│   ├── index.js             # Entry point for configuration settings , importing everything from config to here and export it.
│   └── serverConfig.js      # Server-specific configurations (e.g., port and others).
├── controllers/             # Contains the business logic for handling requests and sedning back the response.
│   ├── adminControllers.js  # Logic for administrative tasks and user management.
│   ├── agentControllers.js  # Logic for managing agent-related operations.
│   ├── fileControllers.js   # Logic for file upload, processing, and distribution.
│   └── index.js             # Aggregates and exports all controllers.
├── db/                      # Database connection and initialization.
│   └── index.js             # Handles MongoDB connection using Mongoose.
├── middlewares/             # Express middleware functions for request processing.
│   ├── authMiddleware.js    # Middleware for authenticating and authorizing requests (JWT verification).
│   ├── index.js             # Aggregates and exports all middlewares.
│   └── uploadFile.js        # Middleware for handling file uploads (using Multer).
├── models/                  # Defines Mongoose schemas for data models.
│   ├── agentModels.js       # Mongoose schema for agent data.
│   ├── fileDataModels.js    # Mongoose schema for uploaded file data and distributed lists.
│   ├── index.js             # Aggregates and exports all data models.
│   └── userModels.js        # Mongoose schema for user (admin) data.
├── routes/                  # Defines API endpoints and links them to controllers.
│   ├── agentRoutes.js       # API routes for agent management.
│   ├── authRoutes.js        # API routes for user authentication (login, register, logout).
│   ├── fileRoutes.js        # API routes for file upload and list distribution.
│   └── index.js             # Aggregates and exports all API routes.
├── utils/                   # Utility functions used across the application.
│   ├── checkPassword.js     # Utility for comparing plain text passwords with hashed passwords.
│   ├── encryptPassword.js   # Utility for hashing passwords (using bcryptjs).
│   ├── index.js             # Aggregates and exports all utility functions.
│   └── jwtToken.js          # Utility for generating and verifying JWTs.
└── index.js                 # The main entry point for the Express application.
.env                         # Environment variables for configuration.

📦 Setup & Running Locally

Follow these steps to get the backend application running on your local machine:

    Clone the repository:
         git clone https://github.com/SIDDHARTH7729/Machine_Test_Assignment_Backend.git
         cd Machine_Test_Assignment_Backend      (or rename it)

    Install Dependencies:
         npm install

    Setup .env file:
        Add this items:
           PORT=5000                                 # Or any other port you prefer but make sure to put same in .encv in frontend
           MONGODB_URI=mongodb://localhost:27017/agents_app # Your MongoDB connection string
           JWT_SECRET_KEY=YOUR_SECRET_KEY            # IMPORTANT: Keep this secret key consistent with your frontend
           NEXT_PUBLIC_API_URL=                      # Important to keep the one on which the frontend is running. (By default http://localhost:5000 )

    Run the Development Server:
        npm run dev



The backend server should now be running, typically on http://localhost:5000.