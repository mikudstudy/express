import express, { Router } from 'express';
import serverless from 'serverless-http';
import path  from "path";

// const serverless = require("serverless-http");
import cookieParser from "cookie-parser";
import cors from "cors";
import dbService from "../../services/db.service.js";

const app = express();
import enableCors from "../../middlewares/cors.js";
import dotenv from "dotenv";
import session from "express-session";

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // Force save of session for each request
    saveUninitialized: true, // Save a session that is new, but has not been modified
    cookie: { maxAge: 10 * 60 * 1000 }, // milliseconds!
  })
);



const allowedOrigins = [
    "https://www.mikudstudy.vercel.app",
    "https://mikudstudy.vercel.app",
    "https://www.mikudstudy.netlify.app",
    "https://mikudstudy.netlify.app",
    "https://www.mikudstudy.com",
    "https://mikudstudy.com",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://api.mikudstudy.com",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
  ];
  
const corsOptions = {
origin: allowedOrigins,
credentials: true,
};
app.use(cors(corsOptions));
/* }  */

dotenv.config();
dbService.connect();
// Express App Config
app.use(enableCors);

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

app.use('/api/', router);

export const handler = serverless(app);