import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import assignmentRouter from "./routes/assignmentRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import notesRouter from "./routes/notesRoutes.js";
import attendenceRouter from "./routes/attendenceRoutes.js";
import assignmentUploadRouter from "./routes/assignmentUploadRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/student", studentRouter);
app.use("/api/attendence", attendenceRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/assignmentUploads", assignmentUploadRouter);
app.use("/api/notes", notesRouter);
app.get("/test", (req,res) => res.send("Server is live"));

app.listen(port, () => console.log(`Server is running on port ${port}`));