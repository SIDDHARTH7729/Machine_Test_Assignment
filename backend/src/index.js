const express = require('express');
const connectToDB = require('./db');
const {ServerConfig} = require('./config');
const {authRoutes,agentRoutes,fileRoutes} = require('./routes');

// intialize express app
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",              
}));

// import routes
app.use("/api/auth",authRoutes)
app.use("/api/agents",agentRoutes)
app.use("/api/files",fileRoutes)

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});

// initialise db connection
connectToDB();