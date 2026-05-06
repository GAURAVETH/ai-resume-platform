import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import resumeRoutes
    from "./routes/resumeRoutes.js";

import analysisRoutes
    from "./routes/analysisRoutes.js";

const app = express();

//When the mongoDB connection is established, the server will start listening for requests. 
// This ensures that the server only starts after a successful database connection, 
// preventing potential issues with handling requests when the database is not available.
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use(
    "/api/resume",
    resumeRoutes
);

app.use(
    "/api/analysis",
    analysisRoutes
);

// TEST ROUTE
app.get("/", (req, res) => {

    res.send(
        "AI Resume Analyzer Backend"
    );
});

// SERVER
const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on ${PORT}`
    );
});