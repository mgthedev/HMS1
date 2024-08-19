import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "https://emsfront.vercel.app", "https://emsadmin.vercel.app", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Define your API routes here
app.use("/api/v1/message", messageRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
    res.send("Cloud server is running!");
});

dbConnection();
app.use(errorMiddleware);

export default app;
