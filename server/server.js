import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/course", courseRouter);
app.use("/api/subject", subjectRouter);
app.get("/test", (req,res) => res.send("Server is live"));

app.listen(port, () => console.log(`Server is running on port ${port}`));