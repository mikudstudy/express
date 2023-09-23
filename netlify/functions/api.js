import express, { Router } from 'express';
import serverless from 'serverless-http';
import path  from "path";

// const serverless = require("serverless-http");
import cookieParser from "cookie-parser";
import cors from "cors";
import dbService from "../../services/db.service.js";
import {createServer} from "http";

import enableCors from "../../middlewares/cors.js";
import dotenv from "dotenv";
import session from "express-session";
import { setupSocketAPI } from "../../services/socket.service.js";
// import http from require("http").createServer(app);



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const http = createServer(app);
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
    "http://localhost:8888/"
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




// const authRoutes = require("../../api/auth/auth.routes");
// const userRoutes = require("./api/user/user.routes");
// const contactRoutes = require("./api/contact/contact.routes");
// const marathonRoutes = require("./api/marathon/marathon.routes");
// const scheduleLessonRoutes = require("./api/scheduleLesson/scheduleLesson.routes");
import {offersRoutes} from "../../api/offers/offers.routes";
// const lessonRoutes = require("./api/lesson/lesson.routes");
// const talkToUsRoute = require("./api/talkToUs/talkToUs.routes");


const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

app.use('/api/offers', offersRoutes.router);

setupSocketAPI(http);


export const handler = serverless(app);