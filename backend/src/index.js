// This si the main entry point of the application, where the server is initialized and routes are set up.
const express = require('express');
const connectToDB = require('./db');
// Importing the necessary configurations and routes
const {ServerConfig} = require('./config');
const {authRoutes,agentRoutes,fileRoutes} = require('./routes');

// intialize express app
const cors = require("cors");
const app = express();

// Middleware to parse JSON and URL-encoded data, and to enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for the client URL specified in the environment variables
app.use(cors({
    origin: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,              
}));

// import routes
app.use("/api/auth",authRoutes)
app.use("/api/agents",agentRoutes)
app.use("/api/files",fileRoutes)

//  listen to the server on the specified port
app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});

// initialise db connection
connectToDB();